import { db as prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const soldVehiclesWithoutSale = await prisma.vehicle.findMany({
            where: {
                status: 'Vendido',
                sale: null,
            },
            include: {
                sale: true,
            }
        });

        if (soldVehiclesWithoutSale.length === 0) {
            return NextResponse.json({ message: "Nenhum veículo vendido pendente de migração encontrado." });
        }

        let migrated = 0;
        const records = [];

        for (const vehicle of soldVehiclesWithoutSale) {
            const newSale = await prisma.sale.create({
                data: {
                    vehicleId: vehicle.id,
                    saleDate: vehicle.updatedAt || new Date(),
                    buyerName: 'Cliente Histórico (Migração)',
                    saleValue: vehicle.price || 0,
                    paymentMethod: 'Sistema Antigo',
                    warrantyType: 'Sistema Antigo, Sem Garantia',
                },
            });
            records.push(newSale);
            migrated++;
        }

        return NextResponse.json({ message: `Migração concluída! ${migrated} registros criados.`, records });
    } catch (error) {
        console.error("Erro durante a migração:", error);
        return NextResponse.json({ error: "Erro interno", details: error.message }, { status: 500 });
    }
}
