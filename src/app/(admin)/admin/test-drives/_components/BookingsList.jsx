"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { getBookings, updateBookingStatus, deleteBooking } from "@/actions/testdrive";
import { DataTable } from "@/components/DataTable";
import { getBookingColumns } from "../_schemas/bookingTableColumnDef";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Filter, Plus } from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BookingsList() {
    const queryClient = useQueryClient();
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [search, setSearch] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const { data: response, isLoading } = useQuery({
        queryKey: ["bookings", search, pageIndex, pageSize, statusFilter, typeFilter],
        queryFn: () => getBookings({
            search,
            page: pageIndex,
            limit: pageSize,
            status: statusFilter === "all" ? null : statusFilter,
            isTestDrive: typeFilter === "all" ? null : typeFilter === "true"
        }),
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }) => updateBookingStatus(id, status),
        onSuccess: () => {
            toast.success("Status atualizado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: () => toast.error("Falha ao atualizar status.")
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteBooking(id),
        onSuccess: () => {
            toast.success("Agendamento removido.");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: () => toast.error("Falha ao remover agendamento.")
    });

    const columns = getBookingColumns({
        onUpdateStatus: (id, status) => updateStatusMutation.mutate({ id, status }),
        onDelete: (id) => setBookingToDelete(id)
    });

    const table = useReactTable({
        data: response?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: response?.totalPages || -1,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newState = updater({ pageIndex, pageSize });
                setPageIndex(newState.pageIndex);
                setPageSize(newState.pageSize);
            } else {
                setPageIndex(updater.pageIndex);
                setPageSize(updater.pageSize);
            }
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por cliente, carro ou notas..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos Status</SelectItem>
                            <SelectItem value="PENDING">Pendentes</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmados</SelectItem>
                            <SelectItem value="COMPLETED">Concluídos</SelectItem>
                            <SelectItem value="CANCELLED">Cancelados</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Visitas e Tests</SelectItem>
                            <SelectItem value="true">Apenas Test Drive</SelectItem>
                            <SelectItem value="false">Apenas Visitas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="border-blue-100 dark:border-blue-900 shadow-sm">
                <CardContent className="p-0">
                    <DataTable
                        columns={columns}
                        table={table}
                        loading={isLoading}
                    />
                    {(!isLoading && response?.data?.length === 0) && (
                        <div className="p-8 text-center text-muted-foreground">
                            Nenhum agendamento encontrado.
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={!!bookingToDelete} onOpenChange={(open) => !open && setBookingToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Agendamento</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir permanentemente este agendamento? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => {
                                deleteMutation.mutate(bookingToDelete);
                                setBookingToDelete(null);
                            }}
                        >
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
