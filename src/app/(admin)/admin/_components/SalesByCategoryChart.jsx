"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export function SalesByCategoryChart({ data }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Placeholder sem gráfico enquanto o app hidrata para evitar mismatch de SVG no servidor
    if (!mounted) {
        return (
            <Card className="col-span-full md:col-span-1 border shadow-sm flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle>Vendas por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 w-full min-h-[300px]">
                </CardContent>
            </Card>
        );
    }

    // Caso não existam dados
    if (!data || data.length === 0) {
        return (
            <Card className="col-span-full md:col-span-1 border shadow-sm flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle>Vendas por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-[300px] flex items-center justify-center text-muted-foreground text-sm">
                    Sem dados suficientes no período.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-full md:col-span-1 border shadow-sm flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle>Vendas por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`${value} unidades`, "Vendas"]}
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
