"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { PeriodSelector } from "../../_components/PeriodSelector";
import SoldVehiclesList from "./SoldVehiclesList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function SalesDashboard({ initialData, period }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePeriodChange = (newPeriod) => {
        const params = new URLSearchParams(searchParams);
        params.set("period", newPeriod);
        router.push(`?${params.toString()}`);
    };

    if (!initialData || !initialData.success) {
        return (
            <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                    {initialData?.error || "Falha ao carregar os dados de vendas"}
                </AlertDescription>
            </Alert>
        );
    }

    const { salesTrend } = initialData.data;

    return (
        <div className="space-y-6">
            <div className="flex justify-end pr-2">
                <PeriodSelector
                    selectedPeriod={period}
                    onPeriodChange={handlePeriodChange}
                />
            </div>

            <div className="grid gap-4 lg:grid-cols-1">
                {/* O gráfico de Vendas foi removido desta tela por baixa adoção. Agora vive apenas no Dashboard Principal. */}
            </div>

            <Card className="mt-6">
                <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Histórico de Veículos Vendidos</h2>
                    <SoldVehiclesList />
                </CardContent>
            </Card>
        </div>
    );
}
