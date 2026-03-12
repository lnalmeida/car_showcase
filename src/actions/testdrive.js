"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { deepSerialize } from "@/lib/utils";
import { checkUser } from "@/lib/checkUser";

/**
 * Busca todos os agendamentos (Test Drives e Visitas) com filtros e paginação.
 */
export async function getBookings({
    search = "",
    page = 0,
    limit = 10,
    status = null,
    isTestDrive = null
} = {}) {
    try {
        const where = {
            OR: [
                { clientName: { contains: search, mode: 'insensitive' } },
                { clientPhone: { contains: search, mode: 'insensitive' } },
                { notes: { contains: search, mode: 'insensitive' } },
                { Vehicle: { model: { contains: search, mode: 'insensitive' } } },
                { user: { name: { contains: search, mode: 'insensitive' } } }
            ]
        };

        if (status) where.status = status;
        if (isTestDrive !== null) where.isTestDrive = isTestDrive;

        const [data, totalCount] = await Promise.all([
            prisma.visitBooking.findMany({
                where,
                include: {
                    user: true,
                    Vehicle: {
                        include: {
                            brand: true
                        }
                    }
                },
                orderBy: { visitDate: 'desc' },
                skip: page * limit,
                take: limit
            }),
            prisma.visitBooking.count({ where })
        ]);

        return deepSerialize({ success: true, data, totalCount });
    } catch (error) {
        console.error("Erro ao buscar agendamentos");
        return { success: false, error: "Falha ao carregar agendamentos" };
    }
}

/**
 * Busca um agendamento específico.
 */
export async function getBooking(id) {
    try {
        const data = await prisma.visitBooking.findUnique({
            where: { id },
            include: {
                user: true,
                Vehicle: {
                    include: {
                        brand: true
                    }
                }
            }
        });
        if (!data) return { success: false, error: "Agendamento não encontrado" };
        return deepSerialize({ success: true, data });
    } catch (error) {
        return { success: false, error: "Agendamento não encontrado" };
    }
}

/**
 * Cria ou atualiza um agendamento.
 */
export async function upsertBooking(data) {
    try {
        const { id, ...details } = data;

        // Limpeza de campos para o Prisma
        const payload = {
            ...details,
            visitDate: new Date(details.visitDate.includes("T") ? details.visitDate : `${details.visitDate}T00:00:00.000Z`),
            // Se tiver userId, vincula ao usuário, senão usa os campos de lead externo
        };

        let result;

        if (payload.vehicleId) {
            const conflictingBookings = await prisma.visitBooking.findMany({
                where: {
                    vehicleId: payload.vehicleId,
                    visitDate: payload.visitDate,
                    status: { notIn: ["CANCELLED", "COMPLETED"] },
                    id: id ? { not: id } : undefined,
                    AND: [
                        { startTime: { lt: payload.endTime } },
                        { endTime: { gt: payload.startTime } }
                    ]
                }
            });

            if (conflictingBookings.length > 0) {
                return { success: false, error: "Este veículo já possui um agendamento neste horário." };
            }
        }

        // Limpar payload para conter apenas campos do VisitBooking
        const dbPayload = {
            userId: payload.userId || null,
            dealershipInfoId: payload.dealershipInfoId || null,
            visitDate: payload.visitDate,
            startTime: payload.startTime,
            endTime: payload.endTime,
            status: payload.status || "PENDING",
            notes: payload.notes || null,
            isTestDrive: payload.isTestDrive || false,
            clientName: payload.clientName || null,
            clientPhone: payload.clientPhone || null,
            clientEmail: payload.clientEmail || null,
            vehicleId: payload.vehicleId || null,
        };

        if (id) {
            result = await prisma.visitBooking.update({
                where: { id },
                data: dbPayload
            });
        } else {
            // Busca o id da primeira concessionaria cadastrada
            const dealership = await prisma.dealershipInfo.findFirst();
            if (dealership) {
                dbPayload.dealershipInfoId = dealership.id;
            }

            result = await prisma.visitBooking.create({
                data: dbPayload
            });
        }

        revalidatePath("/admin/test-drives");
        revalidatePath("/admin"); // Painel de controle
        return deepSerialize({ success: true, data: result });
    } catch (error) {
        console.error("Erro ao salvar agendamento");
        return { success: false, error: "Ocorreu um erro ao salvar o agendamento" };
    }
}

/**
 * Atualiza apenas o status de um agendamento.
 */
export async function updateBookingStatus(id, status) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        await prisma.visitBooking.update({
            where: { id },
            data: { status }
        });
        revalidatePath("/admin/test-drives");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Erro ao atualizar status" };
    }
}

/**
 * Deleta um agendamento.
 */
export async function deleteBooking(id) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        await prisma.visitBooking.delete({ where: { id } });
        revalidatePath("/admin/test-drives");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Erro ao excluir agendamento" };
    }
}

/**
 * Busca veículos que estão livres para uma determinada data e horário.
 */
export async function getAvailableVehiclesForBooking(date, startTime, endTime) {
    try {
        // Garantindo que a data fique no início do dia e não cause problemas de Timezone
        const visitDateStr = date.includes("T") ? date : `${date}T00:00:00.000Z`;
        const visitDateObj = new Date(visitDateStr);


        // Verifica se há agendamentos que caem no mesmo dia e intercedem no horário
        const occupiedBookings = await prisma.visitBooking.findMany({
            where: {
                visitDate: visitDateObj,
                status: { notIn: ["CANCELLED", "COMPLETED"] }
            },
            select: { vehicleId: true, startTime: true, endTime: true }
        });

        // Fitra no Javascript para evitar problemas com collation de String do BD (ex: "09:00" < "10:00")
        const conflictingIds = occupiedBookings.filter(b => {
            // Só é conflito se: inicioNovo < fimExistente E fimNovo > inicioExistente
            return startTime < b.endTime && endTime > b.startTime;
        }).map(b => b.vehicleId).filter(Boolean);


        // Buscar veículos disponíveis (não vendidos e não no array de ocupados)
        const availableVehicles = await prisma.vehicle.findMany({
            where: {
                status: { not: "Vendido" },
                id: { notIn: conflictingIds }
            },
            include: {
                brand: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return deepSerialize({ success: true, data: availableVehicles });
    } catch (error) {
        console.error("Erro ao buscar veículos livres");
        return { success: false, error: "Falha ao buscar veículos livres" };
    }
}

/**
 * Busca agendamentos do usuário logado.
 */
export async function getUserBookings() {
    try {
        const user = await checkUser();
        if (!user) return { success: false, error: "Usuário não autenticado" };

        const data = await prisma.visitBooking.findMany({
            where: { userId: user.id },
            include: {
                Vehicle: {
                    include: { brand: true }
                }
            },
            orderBy: { visitDate: 'desc' }
        });

        return deepSerialize({ success: true, data });
    } catch (error) {
        console.error("Erro ao buscar reservas do usuário");
        return { success: false, error: "Falha ao buscar suas reservas" };
    }
}

/**
 * Cancela um agendamento do usuário com validação de 24h.
 */
export async function cancelBookingByUser(id) {
    try {
        const user = await checkUser();
        if (!user) return { success: false, error: "Usuário não autenticado" };

        const booking = await prisma.visitBooking.findUnique({
            where: { id, userId: user.id }
        });

        if (!booking) return { success: false, error: "Agendamento não encontrado" };

        // Validação de 24h
        const now = new Date();
        const bookingTime = new Date(booking.visitDate);
        const [hours, minutes] = booking.startTime.split(":");
        bookingTime.setHours(parseInt(hours), parseInt(minutes), 0);

        const diffInMs = bookingTime.getTime() - now.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return { success: false, error: "Alterações e cancelamentos só são permitidos com 24h de antecedência." };
        }

        await prisma.visitBooking.update({
            where: { id },
            data: { status: "CANCELLED" }
        });

        revalidatePath("/reservations");
        revalidatePath("/admin/test-drives");
        return { success: true };
    } catch (error) {
        console.error("Erro ao cancelar reserva");
        return { success: false, error: "Falha ao cancelar reserva" };
    }
}

/**
 * Atualiza um agendamento do usuário com validação de 24h e conflitos.
 */
export async function updateBookingByUser(id, data) {
    try {
        const user = await checkUser();
        if (!user) return { success: false, error: "Usuário não autenticado" };

        const booking = await prisma.visitBooking.findUnique({
            where: { id, userId: user.id }
        });

        if (!booking) return { success: false, error: "Agendamento não encontrado" };

        // Validação de 24h
        const now = new Date();
        const bookingTime = new Date(booking.visitDate);
        const [hours, minutes] = booking.startTime.split(":");
        bookingTime.setHours(parseInt(hours), parseInt(minutes), 0);

        const diffInMs = bookingTime.getTime() - now.getTime();
        if (diffInMs / (1000 * 60 * 60) < 24) {
            return { success: false, error: "Alterações só são permitidas com 24h de antecedência." };
        }

        // Se mudar data/hora/veículo, validar conflitos
        const payload = {
            ...data,
            visitDate: new Date(data.visitDate.includes("T") ? data.visitDate : `${data.visitDate}T00:00:00.000Z`),
            status: "PENDING" // Sempre volta para pendente ao editar? Ou mantém se for CONFIRMED?
            // "O usuário não pode alterar status... Sempre ao incluir um agendamento, o status é pendente."
        };

        if (payload.vehicleId) {
            const conflicting = await prisma.visitBooking.findMany({
                where: {
                    vehicleId: payload.vehicleId,
                    visitDate: payload.visitDate,
                    status: { notIn: ["CANCELLED", "COMPLETED"] },
                    id: { not: id },
                    AND: [
                        { startTime: { lt: payload.endTime } },
                        { endTime: { gt: payload.startTime } }
                    ]
                }
            });

            if (conflicting.length > 0) {
                return { success: false, error: "Este horário já está ocupado por outro cliente." };
            }
        }

        await prisma.visitBooking.update({
            where: { id },
            data: payload
        });

        revalidatePath("/reservations");
        revalidatePath("/admin/test-drives");
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar reserva");
        return { success: false, error: "Falha ao atualizar reserva" };
    }
}

/**
 * Permite ao usuário confirmar um agendamento pendente.
 */
export async function confirmBookingByUser(id) {
    try {
        const user = await checkUser();
        if (!user) return { success: false, error: "Usuário não autenticado" };

        const booking = await prisma.visitBooking.findUnique({
            where: { id, userId: user.id }
        });

        if (!booking) return { success: false, error: "Agendamento não encontrado" };
        if (booking.status !== "PENDING") return { success: false, error: "Apenas agendamentos pendentes podem ser confirmados." };

        await prisma.visitBooking.update({
            where: { id },
            data: { status: "CONFIRMED" }
        });

        revalidatePath("/reservations");
        revalidatePath("/admin/test-drives");
        return { success: true };
    } catch (error) {
        console.error("Erro ao confirmar reserva");
        return { success: false, error: "Falha ao confirmar agendamento" };
    }
}

