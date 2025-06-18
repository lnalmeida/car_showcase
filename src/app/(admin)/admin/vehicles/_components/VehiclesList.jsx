"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  MoreHorizontal,
  Star,
  StarOff,
  Loader2,
  Car,
  Eye,
  Trash,
  Pencil,
  Stamp,
  PencilOff,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

import useFetch from "@/hooks/useFetch";
import { getVehicles, removeVehicle, updateVehicle } from "@/actions/vehicles";

const VehiclesList = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sorting, setSorting] = useState([]);

  const [featured, setFeatured] = useState(null);

  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const setBadgeStatusColor = (status) => {
    switch (status) {
      case "Disponível":
        return {
          variant: "success",
          badgeColor: "bg-green-500 font-semibold text-white",
        };
      case "Vendido":
        return {
          variant: "danger",
          badgeColor: "bg-red-500 font-semibold text-white",
        };
      case "Reservado":
        return {
          variant: "warning",
          badgeColor: "bg-yellow-500 font-semibold text-white ",
        };
    }
  };

  const {
    loading: loadingVehicles,
    fn: fetchVehicles,
    data: vehiclesData,
    error: VehiclesError,
  } = useFetch(getVehicles);

  useEffect(() => console.log(vehiclesData), [vehiclesData]);

  useEffect(() => {
    fetchVehicles(search);

    console.log("Vehicles data:", vehiclesData);
  }, [search]);

  useEffect(() => {
    fetchVehicles(search)
      .then((res) => {
        console.log("Retorno da API:", res);
      })
      .catch((err) => {
        console.error("Erro ao buscar veículos:", err);
      });
  }, [search]);

  const {
    loading: deletingVehicle,
    fn: deleteVehicle,
    data: deleteResult,
    error: deleteError,
  } = useFetch(removeVehicle);

  const {
    loading: updatingVehicle,
    fn: updateVehicles,
    data: updateResult,
    error: updateError,
  } = useFetch(updateVehicle);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // // API call
  };

  const handleUpdateFeatured = async (data) => {
    console.log("Chama afunção de alterar fetured no front");
    const res = await updateVehicle(data.id, {
      featured: !data.featured,
      status: data.status,
    });

    if (res.success) {
      fetchVehicles(search);
    }
  };

  const handleUpdateStatus = async (data, value) => {
    console.log("Chama afunção de alterar status no front");
    if (data.status === value) return;
    const toggleFeatured = value === "Vendido" ? false : data.featured;
    const res = await updateVehicle(data.id, {
      status: value,
      featured: toggleFeatured,
    });

    if (res.success) {
      fetchVehicles(search);
    }
  };

  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;

    const res = await deleteVehicle(vehicleToDelete.id);
    if (res.success) {
      toast.success("Veículo excluído com sucesso!");
      fetchVehicles(search);
    } else {
      toast.error("Erro ao excluir veículo.");
    }

    setDeleteDialogOpen(false);
    setVehicleToDelete(null);
  };

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
      {/* Vehicles Table */}

      <Card className="mb-1 overflow-scroll-y">
        <CardContent>
          {loadingVehicles && !vehiclesData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
            </div>
          ) : vehiclesData?.success && vehiclesData?.data?.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="text-left">
                  <TableRow className="space-x-10">
                    <TableHead className="w-[150px]">Foto</TableHead>
                    <TableHead className="w-[150px]">Marca</TableHead>
                    <TableHead className="w-[150px]">Modelo</TableHead>
                    <TableHead className="w-[150px]">Cor</TableHead>
                    <TableHead className="w-[150px] text-center">Ano</TableHead>
                    <TableHead className="text-right w-[100px]">
                      Preço
                    </TableHead>
                    <TableHead className="w-[150px] text-center">
                      Status
                    </TableHead>
                    <TableHead className="w-[150px] text-center px-4">
                      Destaque?
                    </TableHead>
                    <TableHead className="w-[150px] text-right">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehiclesData?.success &&
                    vehiclesData.data.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium w-10 h-10 rounded-lg overflow-hidden">
                          {vehicle.images.length > 0 ? (
                            <img
                              src={vehicle.images[0]}
                              alt={`${vehicle.vehicleBrand} ${vehicle.model}`}
                              className="h-14 w-14 rounded-lg"
                            />
                          ) : (
                            <Car className="h-14 w-14 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell>{vehicle.vehicleBrand}</TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell className="text-left">
                          {vehicle.color}
                        </TableCell>
                        <TableCell className="text-center">
                          {vehicle.year}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(vehicle.price)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              setBadgeStatusColor(vehicle.status).variant
                            }
                            className={
                              setBadgeStatusColor(vehicle.status).badgeColor
                            }
                          >
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center px-4">
                          {vehicle.status === "Disponível" ? (
                            vehicle.featured ? (
                              <Star
                                onClick={() => handleUpdateFeatured(vehicle)}
                                className="inline-block h-4 w-4 cursor-pointer text-yellow-500 fill-current text-center"
                              />
                            ) : (
                              <Star
                                onClick={() => handleUpdateFeatured(vehicle)}
                                className="inline-block h-4 w-4 cursor-pointer text-muted-300 text-center"
                              />
                            )
                          ) : (
                            <StarOff
                              disabled
                              className="cursor-not-allowed inline-block h-4 w-4  text-muted-300 text-center"
                            />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel className="flex items-center gap-2">
                                <Car className="h-6 w-6 mr-2" />
                                Veículos
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-300" />

                              <DropdownMenuItem
                                className="cursor-pointer text-muted-200 font-semibold"
                                onClick={() =>
                                  router.push(`/admin/vehicles/${vehicle.id}`)
                                }
                              >
                                <Eye className="h-5 w-5 mr-1 text-muted-200" />
                                Visualizar
                              </DropdownMenuItem>

                              <DropdownMenuGroup>
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger
                                    disabled={vehicle.status === "Vendido"}
                                    className={
                                      vehicle.status === "Vendido"
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                    }
                                  >
                                    <Stamp className="h-5 w-5 mr-1 text-muted-200" />
                                    Status
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                      className="cursor-pointer"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          vehicle,
                                          "Disponível"
                                        )
                                      }
                                    >
                                      Disponível
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="cursor-pointer"
                                      onClick={() =>
                                        handleUpdateStatus(vehicle, "Vendido")
                                      }
                                    >
                                      Vendido
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="cursor-pointer"
                                      onClick={() =>
                                        handleUpdateStatus(vehicle, "Reservado")
                                      }
                                    >
                                      Reservado
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              </DropdownMenuGroup>

                              <DropdownMenuItem
                                className="cursor-pointer text-red-500 font-semibold"
                                onClick={() => {
                                  setVehicleToDelete(vehicle);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash className="h-4 w-4 mr-1 text-red-500" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-center text-gray-400 font-medium">
                <Car className="h-4 w-4 mr-2" />
                Sem veículos para exibir
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-center gap-2 py-4 mt-2 w-full sticky ">
          <div className="flex-1 text-sm text-muted-foreground">
            {vehiclesData?.success && (
              <p>
                Exibindo{" "}
                <span className="font-bold">{vehiclesData.data.length}</span> de{" "}
                <span className="font-bold">{vehiclesData.totalCount}</span>{" "}
                veículos
              </p>
            )}
          </div>
        </CardContent>
      </Card>
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
              onClick={handleConfirmDelete}
              disabled={!vehicleToDelete}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehiclesList;
