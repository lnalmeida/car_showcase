"use client";

import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function SalesTrendChart({ data, period }) {
  const chartData = data || [];
  const chartConfig = {
    sales: {
      label: "Vendas",
      color: "hsl(var(--chart-1))",
    },
  };

  const tickFormatter = (value) => {
    const date = new Date(value);
    switch (period) {
      case "yearly":
        return date.toLocaleDateString("pt-BR", { month: "short" });
      case "weekly":
        return date.toLocaleDateString("pt-BR", { weekday: "short" });
      default:
        return date.toLocaleDateString("pt-BR", {
          month: "short",
          day: "numeric",
        });
    }
  };

  const description = () => {
    switch (period) {
      case "yearly":
        return "Vendas de veículos nos últimos 12 meses";
      case "weekly":
        return "Vendas de veículos nos últimos 7 dias";
      default:
        return "Vendas de veículos nos últimos 30 dias";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência de Vendas</CardTitle>
        <CardDescription>{description()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={tickFormatter}
            />
            <YAxis allowDecimals={false} />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="sales"
              type="monotone"
              stroke={chartConfig.sales.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          {chartData.length > 1
            ? `Mostrando tendência para o período selecionado.`
            : "Dados insuficientes para mostrar tendência."}
        </div>
      </CardFooter>
    </Card>
  );
}
