"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

    // Constants for manual SVG
    const size = 200;
    const center = size / 2;
    const outerRadius = 80;
    const innerRadius = 55;
    const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

    let cumulativeAngle = 0;

    return (
        <Card className="col-span-full md:col-span-1 border shadow-sm flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle>Vendas por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full flex flex-col items-center justify-center pt-2">
                <div className="relative" style={{ width: size, height: size }}>
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        <g transform={`translate(${center}, ${center})`}>
                            {chartData.map((item, index) => {
                                const angle = (item.value / total) * 360;
                                const startAngle = cumulativeAngle;
                                const endAngle = cumulativeAngle + angle;
                                cumulativeAngle += angle;

                                // Case: 100% (only one category)
                                if (angle >= 359.9) {
                                    return (
                                        <path
                                            key={index}
                                            d={`
                        M 0, -${outerRadius}
                        A ${outerRadius}, ${outerRadius} 0 1, 1 0, ${outerRadius}
                        A ${outerRadius}, ${outerRadius} 0 1, 1 0, -${outerRadius}
                        M 0, -${innerRadius}
                        A ${innerRadius}, ${innerRadius} 0 1, 0 0, ${innerRadius}
                        A ${innerRadius}, ${innerRadius} 0 1, 0 0, -${innerRadius}
                        Z
                      `}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    );
                                }

                                // Normal slice math
                                const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
                                    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
                                    return {
                                        x: centerX + radius * Math.cos(angleInRadians),
                                        y: centerY + radius * Math.sin(angleInRadians),
                                    };
                                };

                                const startOuter = polarToCartesian(0, 0, outerRadius, startAngle);
                                const endOuter = polarToCartesian(0, 0, outerRadius, endAngle);
                                const startInner = polarToCartesian(0, 0, innerRadius, endAngle);
                                const endInner = polarToCartesian(0, 0, innerRadius, startAngle);

                                const largeArcFlag = angle <= 180 ? "0" : "1";

                                const pathData = [
                                    `M ${startOuter.x} ${startOuter.y}`,
                                    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
                                    `L ${startInner.x} ${startInner.y}`,
                                    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y}`,
                                    "Z",
                                ].join(" ");

                                return (
                                    <path
                                        key={index}
                                        d={pathData}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="#fff"
                                        strokeWidth="2"
                                    />
                                );
                            })}
                        </g>
                    </svg>

                    {/* Total units in the center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-foreground">{total}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">unidades</span>
                    </div>
                </div>

                {/* Custom Legend */}
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            <div
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-xs font-medium text-muted-foreground">
                                {item.name}: <span className="text-foreground">{item.value}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
