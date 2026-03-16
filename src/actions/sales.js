"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { deepSerialize } from "@/lib/utils";
import { z } from "zod";

const saleSchema = z.object({
    vehicleId: z.string().min(1, "Veículo é obrigatório"),
    sellerId: z.string().nullable().optional(),
    buyerName: z.string().min(1, "Nome do comprador é obrigatório"),
    buyerEmail: z.string().email("E-mail inválido").nullable().optional(),
    buyerPhone: z.string().min(1, "Telefone do comprador é obrigatório"),
    buyerDocument: z.string().min(1, "Documento do comprador é obrigatório"),
    saleDate: z.coerce.date().default(() => new Date()),
    saleValue: z.coerce.number().min(0, "Valor da venda deve ser positivo"),
    paymentMethod: z.string().min(1, "Método de pagamento é obrigatório"),
    downPayment: z.coerce.number().min(0).default(0),
    tradeInValue: z.coerce.number().min(0).default(0),
    notes: z.string().nullable().optional(),
    deliveryDate: z.coerce.date().nullable().optional(),
    warrantyExpirationDate: z.coerce.date().nullable().optional(),
});

export async function createSale(data) {
    try {
        const validatedData = saleSchema.parse(data);
        const { vehicleId, sellerId, ...saleData } = validatedData;

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
        
        revalidateTag("vehicles");
        revalidateTag("featured-vehicles");

        return deepSerialize({ success: true, sale: result });
    } catch (error) {
        console.error("Erro ao registrar venda");
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

        return deepSerialize({ success: true, sales });
    } catch (error) {
        console.error("Erro ao buscar histórico de vendas");
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

        return deepSerialize({
            success: true,
            data,
            totalCount
        });

    } catch (error) {
        console.error("Erro ao buscar vendas paginadas");
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

        return deepSerialize({ success: true, data: sale });
    } catch (error) {
        console.error("Erro ao buscar venda");
        return { success: false, error: "Falha ao buscar registro de venda." };
    }
}

export async function updateSale(id, data) {
    try {
        const validatedData = saleSchema.partial().parse(data);
        const dataToUpdate = { ...validatedData };
        
        if (dataToUpdate.deliveryDate) {
            const today = new Date();
            if (new Date(dataToUpdate.deliveryDate) > today) {
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
        return deepSerialize({ success: true, sale: result });
    } catch (error) {
        console.error("Erro ao atualizar venda");
        return { success: false, error: "Erro ao atualizar registro de CRM." };
    }
}

