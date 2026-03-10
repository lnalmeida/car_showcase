import { redirect } from 'next/navigation';
import { db as prisma } from '@/lib/prisma';
import RegisterSaleForm from './_components/RegisterSaleForm';
import { auth } from '@clerk/nextjs/server';

export default async function RegisterSalePage({ params }) {
    // Acessar ID do veículo via URL params
    const { vehicleId } = await params;

    // Quem está logado registrando a venda
    let sellerId = null;
    const { userId: clerkUserId } = await auth();

    if (clerkUserId) {
        const user = await prisma.user.findUnique({
            where: { clerkUserId },
            select: { id: true }
        });
        if (user) {
            sellerId = user.id;
        }
    }

    // Busca os dados atuais do veículo que será baixado de estoque
    const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        include: {
            brand: true,
            category: true,
            type: true
        }
    });

    if (!vehicle) {
        redirect('/admin/vehicles');
    }

    // Redireciona de volta se o carro já foi vendido a outra pessoa antes dele terminar
    if (vehicle.status === "Vendido") {
        redirect('/admin/sales');
    }

    return (
        <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100">
                    Registrar Venda e Checkout
                </h1>
                <p className="text-muted-foreground">
                    Preencha os dados do comprador para registrar a venda no sistema de Pós-Venda (CRM). <br />
                    O veículo sairá do estoque automaticamente e passará à aba de Veículos Vendidos.
                </p>
            </div>

            <div className="mt-8">
                <RegisterSaleForm vehicle={vehicle} sellerId={sellerId} />
            </div>
        </div>
    );
}
