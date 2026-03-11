const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function runMigration() {
    console.log("Iniciando migração de veículos vendidos antigos...");

    try {
        // Busca veículos com status 'Vendido' mas que não têm uma `Sale` associada
        const soldVehiclesWithoutSale = await prisma.vehicle.findMany({
            where: {
                status: 'Vendido',
                sale: null, // Usa essa condição já que a relação de 1 para 1 foi criada
            },
        });

        if (soldVehiclesWithoutSale.length === 0) {
            console.log("Nenhum veículo vendido pendente de migração encontrado.");
            return;
        }

        console.log(`Encontrados ${soldVehiclesWithoutSale.length} veículos para migrar. Criando registros de Sale...`);

        let migrated = 0;
        for (const vehicle of soldVehiclesWithoutSale) {
            await prisma.sale.create({
                data: {
                    vehicleId: vehicle.id,
                    saleDate: vehicle.updatedAt || new Date(), // Usa a data da última modificação do veículo
                    buyerName: 'Cliente Histórico (Migração)', // Nome descritivo para vendas passadas
                    saleValue: vehicle.price, // Puxa o valor do preço do carro divulgado
                    paymentMethod: 'Histórico Antigo',
                },
            });
            console.log(`[+] Sale criada para o veículo: ${vehicle.vehicleBrand} ${vehicle.model} (${vehicle.id})`);
            migrated++;
        }

        console.log(`Migração concluída! ${migrated} registros criados.`);
    } catch (error) {
        console.error("Erro durante a migração:", error);
    } finally {
        await prisma.$disconnect();
    }
}

runMigration();
