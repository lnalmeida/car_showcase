"use client";

import React, { useState, useEffect, useCallback, use } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  ChevronDown,
  Plus,
  Search,
  Car,
  Trash,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { toast } from "sonner";

import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { getVehicles, removeVehicle, updateVehicle } from "@/actions/vehicles";
import { DataTable } from "@/components/DataTable";
import { getColumns } from "../_schemas/listVehicleTableColumnDef";
import { ClerkLoaded } from "@clerk/nextjs";
import { getPaginationRange } from "@/lib/helpers";

const VehiclesList = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [filterValue, setFilterValue] = useState("all");

  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const queryKey = [
    "vehicles",
    search,
    pageIndex,
    pageSize,
    filterValue,
    sorting,
  ];

  const {
    isLoading: loadingVehicles,
    data: responseData,
    error,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = {
        search,
        page: pageIndex,
        limit: pageSize,
        filter: filterValue === "all" ? null : filterValue,
        sortBy: sorting.length > 0 ? sorting[0].id : null,
        order: sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : null,
      };
      const res = await getVehicles(params);
      return res;
    },
    placeholderData: (previousData) => previousData,
  });

  const vehiclesData = responseData?.data ?? [];
  const totalCount = responseData?.totalCount ?? 0;

  console.log(
    "🔄 COMPONENTE RENDERIZADO - Estado atual de vehiclesData:",
    vehiclesData
  );

  const queryClient = useQueryClient();

  const updateFeaturedMutation = useMutation({
    mutationFn: async (vehicle) => {
      await updateVehicle(vehicle.id, { featured: !vehicle.featured });
    },
    onSuccess: () => {
      toast.success("Destaque do veículo atualizado.");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar destaque do veículo.");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ vehicle, newStatus }) => {
      if (vehicle.status === newStatus) return;
      console.log(
        "feita a veirificação de status \n / veiculo: " +
          vehicle +
          "\n / status: " +
          newStatus
      );
      const toggleFeatured = newStatus === "Vendido" ? false : vehicle.featured;
      const res = await updateVehicle(vehicle.id, {
        status: newStatus,
        featured: toggleFeatured,
      });

      if (res.success) {
        console.log("passamos na mutation");
      }

      if (!res.success) {
        throw new Error(
          `Erro ao atualizar status do veículo: ${res.error.message}`
        );
      }

      console.log("passamos na mutation");
      return res;
    },
    onSuccess: () => {
      toast.success("Status do veículo atualizado.");
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError: () => {
      toast.error(`Erro ao atualizar status do veículo: ${error.message}`);
    },
  });

  const deleteVehicleMutation = useMutation({
    mutationFn: (vehicleId) => removeVehicle(vehicleId),
    onSuccess: () => {
      toast.success("Veículo excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      setDeleteDialogOpen(false);
      setVehicleToDelete(null);
    },
    onError: () => {
      toast.error("Erro ao excluir veículo.");
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // // API call-
  };

  const handleUpdateFeatured = async (vehicle) => {
    console.log("Chama a função handleUpdateFeatured no front");
    updateFeaturedMutation.mutate(vehicle);
  };

  const handleUpdateStatus = async (vehicle, newStatus) => {
    console.log(
      "Chama a função handleUpdateStatus no front",
      vehicle,
      newStatus
    );
    if (vehicle.status === newStatus) return;
    updateStatusMutation.mutate({ vehicle, newStatus });
  };

  const handleConfirmDelete = async () => {
    console.log("Chama a função handleConfirmDelete no front");
    if (!vehicleToDelete) return;
    deleteVehicleMutation.mutate(vehicleToDelete.id);
  };

  const columns = getColumns({
    onUpdateFeatured: handleUpdateFeatured,
    onUpdateStatus: handleUpdateStatus,
    onDelete: (vehicle) => {
      setVehicleToDelete(vehicle);
      setDeleteDialogOpen(true);
    },
    isMounted,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  const paginationRange = getPaginationRange(totalPages, pageIndex + 1);

  const table = useReactTable({
    data: vehiclesData,
    columns,
    pageCount: totalPages,
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      sorting,
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button
          onClick={() => router.push("/admin/vehicles/create")}
          className="flex items-center"
        >
          <Plus className="h-4 w-4mr-2" />
          Adicionar veículo
        </Button>
        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-9 w-full sm:w-60"
              placeholder="Buscar veículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
            />
          </div>
        </form>
      </div>

      {/* Filters */}

      <Card className="flex items-center">
        <CardContent className="flex flex-wrap w-full items-center justify-between space-x-4 py-2">
          <RadioGroup
            value={filterValue}
            onValueChange={setFilterValue}
            className="flex flex-wrap items-center gap-4"
          >
            <Label>Filtrar por tipo:</Label>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Todos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Carro" id="car" />
              <Label htmlFor="car">Carros</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Moto" id="motorcycle" />
              <Label htmlFor="motorcycle">Motos</Label>
            </div>
          </RadioGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Colunas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.displayName || column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* DataTable */}

      <Card className="mb-1 overflow-scroll-y">
        <CardContent>
          <ClerkLoaded>
            <DataTable table={table} loading={loadingVehicles} />
          </ClerkLoaded>
        </CardContent>
      </Card>

      {/* Pagination */}

      {totalCount > 0 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {pageSize} de {totalCount} veículo(s).
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Registros por página</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPageIndex(0);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Pagination className=" mx-4 w-auto ">
              <PaginationContent className="flex items-center gap-1 mr-4">
                <PaginationItem>
                  <Button
                    href="#"
                    variant="outline"
                    className={`mx-1 ${
                      pageIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setPageIndex(pageIndex - 1);
                    }}
                    disabled={pageIndex === 0}
                    aria-disabled={pageIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                  </Button>
                </PaginationItem>

                {paginationRange.map((pageNumber, index) => {
                  if (pageNumber === "...") {
                    return (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  const isActive = pageIndex + 1 === pageNumber;
                  return (
                    <PaginationItem
                      key={pageNumber}
                      className="cursor-pointer mx-1"
                    >
                      <div className="flex items-center space-x-1">
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPageIndex(pageNumber - 1);
                          }}
                          isActive={isActive}
                          className={
                            isActive ? "border-gray-500 bg-gray-200" : ""
                          }
                        >
                          {pageNumber}
                        </PaginationLink>
                      </div>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <Button
                    href="#"
                    className={`mx-1 ${
                      pageIndex + 1 >= totalPages
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      setPageIndex(pageIndex + 1);
                    }}
                    disabled={pageIndex + 1 >= totalPages}
                    aria-disabled={pageIndex + 1 >= totalPages}
                  >
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}

      {/* Confirm deletion dialog */}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o veículo{" "}
              <strong>
                {vehicleToDelete?.vehicleBrand} {vehicleToDelete?.model}
              </strong>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button
              variant="destructive"
              className="flex items-center space-x-3"
              onClick={handleConfirmDelete}
              disabled={deleteVehicleMutation.isPending}
            >
              {deleteVehicleMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>Excluindo...</span>
                </>
              ) : (
                <>
                  <Trash className="mr-2" />
                  <span>Excluir</span>
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehiclesList;
