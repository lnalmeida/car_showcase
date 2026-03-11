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

    if (!mounted) {
        return (
            <Card className="col-span-full md:col-span-1 border shadow-sm flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle>Vendas por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full" />
            </Card>
        );
    }

    // Sanitize data and ensure numeric values
    const chartData = (data || [])
        .map((item) => ({
            name: String(item.name || "Outros"),
            value: Number(item.value) || 0,
        }))
        .filter((item) => item.value > 0);

    if (chartData.length === 0) {
        return (
            <Card className="col-span-full md:col-span-1 border shadow-sm flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle>Vendas por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">
                    Sem dados de vendas para o período.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-full md:col-span-1 border shadow-sm flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle>Vendas por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full mt-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart key={chartData.length}>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            nameKey="name"
                            isAnimationActive={false}
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`${value} unidades`, "Vendas"]}
                            contentStyle={{
                                borderRadius: "8px",
                                border: "none",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
