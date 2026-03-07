import React from "react";
import { CheckCircle } from "lucide-react";
import { getDashboardStats } from "@/actions/dashboard";
import { SalesDashboard } from "./_components/SalesDashboard";

export const metadata = {
    title: "Vendas | Administração",
    description: "Acompanhe o desempenho de vendas da loja.",
};

export const dynamic = "force-dynamic";

const AdminSalesPage = async ({ searchParams }) => {
    const { periodParams } = await searchParams;
    const validPeriods = ["weekly", "monthly", "yearly"];
    const period = validPeriods.includes(periodParams) ? periodParams : "monthly";

    // Reaproveitando a busca de estatísticas que já consolida a tendência de vendas
    const initialData = await getDashboardStats(period);

    return (
        <div className="p-6">
            <div className="flex py-2 space-x-4 items-center">
                <CheckCircle className="h-8 w-8 mb-6 text-green-600" />
                <h1 className="text-2xl font-bold mb-6">Gestão de Vendas</h1>
            </div>
            <SalesDashboard initialData={initialData} period={period} />
        </div>
    );
};

export default AdminSalesPage;
