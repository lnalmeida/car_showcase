"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";

export const getBookingColumns = ({ onUpdateStatus, onDelete }) => [
    {
        accessorKey: "visitDate",
        header: "Data / Hora",
        cell: ({ row }) => {
            const date = new Date(row.original.visitDate);
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{date.toLocaleDateString('pt-BR')}</span>
                    <span className="text-xs text-muted-foreground">{row.original.startTime} - {row.original.endTime}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "clientName",
        header: "Cliente",
        cell: ({ row }) => {
            const name = row.original.clientName || row.original.user?.name || "N/A";
            const phone = row.original.clientPhone || row.original.user?.phone || "";
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{name}</span>
                    <span className="text-xs text-muted-foreground">{phone}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "vehicle",
        header: "Veículo",
        cell: ({ row }) => {
            const vehicle = row.original.Vehicle;
            if (!vehicle) return <span className="text-muted-foreground">Visita Geral</span>;
            return (
                <div className="flex gap-3 items-center">
                    <div className="relative w-12 h-8 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        {vehicle.images && vehicle.images.length > 0 && vehicle.images[0] ? (
                            <Image
                                src={vehicle.images[0]}
                                alt={vehicle.model}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{vehicle.brand?.name} {vehicle.model}</span>
                        <span className="text-xs text-muted-foreground">Ano: {vehicle.year}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "isTestDrive",
        header: "Tipo",
        cell: ({ row }) => (
            <Badge variant={row.original.isTestDrive ? "default" : "outline"} className={row.original.isTestDrive ? "bg-blue-600" : ""}>
                {row.original.isTestDrive ? "Test Drive" : "Visita"}
            </Badge>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const config = {
                PENDING: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
                CONFIRMED: { label: "Confirmado", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
                CANCELLED: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
                COMPLETED: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
                NO_SHOW: { label: "Não Compareceu", color: "bg-gray-100 text-gray-800", icon: XCircle },
            };
            const item = config[status] || { label: status, color: "bg-gray-100", icon: Clock };
            const Icon = item.icon;
            return (
                <Badge className={`${item.color} border-none flex items-center gap-1 w-fit`}>
                    <Icon size={12} />
                    {item.label}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, "CONFIRMED")}>
                            Confirmar Agendamento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, "COMPLETED")}>
                            Marcar como Concluído
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, "CANCELLED")} className="text-red-600">
                            Cancelar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, "NO_SHOW")}>
                            Não Compareceu
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(booking.id)} className="text-red-600">
                            Excluir Registro
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
