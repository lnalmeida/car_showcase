"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

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

        return { success: true, data: JSON.parse(JSON.stringify(data)), totalCount };
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
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
        return { success: true, data: JSON.parse(JSON.stringify(data)) };
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

        // Validação de conflito de horário para o veículo
        if (payload.vehicleId) {
            const conflictingBookings = await prisma.visitBooking.findMany({
                where: {
                    vehicleId: payload.vehicleId,
                    visitDate: payload.visitDate,
                    status: { notIn: ["CANCELLED", "COMPLETED"] },
                    id: id ? { not: id } : undefined, // Ignora o próprio agendamento se for edição
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

        if (id) {
            result = await prisma.visitBooking.update({
                where: { id },
                data: payload
            });
        } else {
            // Busca o id da primeira concessionaria cadastrada
            const dealership = await prisma.dealershipInfo.findFirst();
            if (dealership) {
                payload.dealershipInfoId = dealership.id;
            }

            result = await prisma.visitBooking.create({
                data: payload
            });
        }

        revalidatePath("/admin/test-drives");
        revalidatePath("/admin"); // Painel de controle
        return { success: true, data: JSON.parse(JSON.stringify(result)) };
    } catch (error) {
        console.error("Erro ao salvar agendamento:", error);
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

        console.log(`Buscando veículos livres para: ${date} das ${startTime} às ${endTime}`);

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

        console.log(`IDs conflitantes encontrados:`, conflictingIds);

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

        const vehiclesArray = availableVehicles.map(v => ({
            ...v,
            price: v.price ? v.price.toNumber().toFixed(2) : 0,
            createdAt: v.createdAt?.toISOString(),
            updatedAt: v.updatedAt?.toISOString(),
            brand: v.brand ? {
                ...v.brand,
                createdAt: v.brand.createdAt?.toISOString(),
                updatedAt: v.brand.updatedAt?.toISOString()
            } : null,
            images: v.images || []
        }));

        return { success: true, data: vehiclesArray };
    } catch (error) {
        console.error("Erro ao buscar veículos livres:", error);
        return { success: false, error: "Falha ao buscar veículos livres" };
    }
}
