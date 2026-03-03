import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const periods = [
    { value: "weekly", label: "Semanal", description: "Últimos 7 dias" },
    { value: "monthly", label: "Mensal", description: "Últimos 30 dias" },
    { value: "yearly", label: "Anual", description: "Últimos 12 meses" },
];

export function PeriodSelector({ selectedPeriod, onPeriodChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Período:</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {periods.map((period) => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? "default" : "outline"}
            size="sm"
            onClick={() => onPeriodChange(period.value)}
            className="transition-all"
            title={period.description}
          >
            {period.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
