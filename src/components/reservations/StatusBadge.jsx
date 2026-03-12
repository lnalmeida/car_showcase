import React from "react";
import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG = {
  PENDING: { label: "Pendente", className: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100" },
  CONFIRMED: { label: "Confirmado", className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100" },
  CANCELLED: { label: "Cancelado", className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100" },
  COMPLETED: { label: "Concluído", className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100" },
  NO_SHOW: { label: "Não Compareceu", className: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100" },
};

export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { label: status, className: "" };

  return (
    <Badge variant="outline" className={`font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
}
