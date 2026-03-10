"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSale(data) {
    try {
        const { vehicleId, sellerId, ...saleData } = data;

        // 1. Inicia uma transação para garantir que a venda crie o registro e atualize o carro
        const result = await prisma.$transaction(async (tx) => {
            // Cria o registro da venda
            const newSale = await tx.sale.create({
                data: {
                    ...saleData,
                    vehicle: {
                        connect: { id: vehicleId }
                    },
                    ...(sellerId && {
                        seller: {
                            connect: { id: sellerId }
                        }
                    })
                }
            });

            // Atualiza o status do veículo para Vendido
            await tx.vehicle.update({
                where: { id: vehicleId },
                data: { status: "Vendido" }
            });

            return newSale;
        });

        revalidatePath("/admin/vehicles");
        revalidatePath("/admin/sales");
        revalidatePath(`/admin/vehicles/${vehicleId}`);
        revalidatePath("/"); // Atualiza o portal público

        return { success: true, sale: result };
    } catch (error) {
        console.error("Erro ao registrar venda:", error);
        return { success: false, error: "Falha ao registrar a venda no banco de dados." };
    }
}

export async function getSalesStats() {
    try {
        const sales = await prisma.sale.findMany({
            orderBy: {
                saleDate: 'asc'
            },
            select: {
                saleDate: true,
                saleValue: true,
            }
        });

        // Converte Decimal para Number para serialização
        const serializedSales = sales.map(s => ({
            ...s,
            saleValue: Number(s.saleValue),
            downPayment: s.downPayment ? Number(s.downPayment) : 0,
            tradeInValue: s.tradeInValue ? Number(s.tradeInValue) : 0,
        }));

        return { success: true, sales: serializedSales };
    } catch (error) {
        console.error("Erro ao buscar histórico de vendas:", error);
        return { success: false, error: "Falha ao consultar histórico de vendas." };
    }
}

export async function getSales({ page = 0, limit = 10, search = "" }) {
    try {
        const skip = page * limit;
        const take = limit;

        let where = {};

        if (search) {
            where = {
                OR: [
                    { buyerName: { contains: search, mode: "insensitive" } },
                    { buyerDocument: { contains: search } },
                    {
                        vehicle: {
                            model: { contains: search, mode: "insensitive" }
                        }
                    }
                ]
            }
        }

        const [data, totalCount] = await prisma.$transaction([
            prisma.sale.findMany({
                where,
                skip,
                take,
                orderBy: { saleDate: 'desc' },
                include: {
                    vehicle: {
                        include: { brand: true, type: true }
                    },
                    seller: {
                        select: { name: true, email: true }
                    }
                }
            }),
            prisma.sale.count({ where })
        ]);

        // Converte Decimal para Number para serialização
        const serializedData = data.map(item => ({
            ...item,
            saleValue: Number(item.saleValue),
            downPayment: item.downPayment ? Number(item.downPayment) : 0,
            tradeInValue: item.tradeInValue ? Number(item.tradeInValue) : 0,
            vehicle: item.vehicle ? {
                ...item.vehicle,
                price: Number(item.vehicle.price)
            } : null
        }));

        return {
            success: true,
            data: serializedData,
            totalCount
        };

    } catch (error) {
        console.error("Erro ao buscar vendas paginadas:", error);
        return { success: false, error: "Erro ao varrer o CRM de Vendas", data: [], totalCount: 0 };
    }
}

export async function getSale(id) {
    try {
        const sale = await prisma.sale.findUnique({
            where: { id },
            include: {
                vehicle: {
                    include: { brand: true, type: true }
                },
                seller: {
                    select: { name: true, email: true }
                }
            }
        });

        if (!sale) return { success: false, error: "Venda não encontrada." };

        // Serialização
        const serializedSale = {
            ...sale,
            saleValue: Number(sale.saleValue),
            downPayment: sale.downPayment ? Number(sale.downPayment) : 0,
            tradeInValue: sale.tradeInValue ? Number(sale.tradeInValue) : 0,
            vehicle: sale.vehicle ? {
                ...sale.vehicle,
                price: Number(sale.vehicle.price)
            } : null
        };

        return { success: true, data: serializedSale };
    } catch (error) {
        console.error("Erro ao buscar venda:", error);
        return { success: false, error: "Falha ao buscar registro de venda." };
    }
}

export async function updateSale(id, data) {
    try {
        if (data.deliveryDate) {
            const today = new Date();
            if (new Date(data.deliveryDate) > today) {
                return { success: false, error: "A data de entrega não pode ser no futuro." };
            }
        }

        const result = await prisma.sale.update({
            where: { id },
            data: {
                ...data,
                saleDate: data.saleDate ? new Date(data.saleDate) : undefined,
                deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
                warrantyExpirationDate: data.warrantyExpirationDate ? new Date(data.warrantyExpirationDate) : undefined,
                saleValue: data.saleValue ? Number(data.saleValue) : undefined,
                downPayment: data.downPayment ? Number(data.downPayment) : undefined,
                tradeInValue: data.tradeInValue ? Number(data.tradeInValue) : undefined,
            }
        });

        revalidatePath("/admin/sales");
        return { success: true, sale: result };
    } catch (error) {
        console.error("Erro ao atualizar venda:", error);
        return { success: false, error: "Erro ao atualizar registro de CRM." };
    }
}

