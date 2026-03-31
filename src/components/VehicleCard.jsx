"use client";

import React from "react";
import { useState } from "react";

import { Calendar, Gauge, Star } from "lucide-react";
import { MotorizationEngine } from "@/assets/icons/icons";

import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { saveUserVehicles, unsaveUserVehicles } from "@/actions/vehicleCatalog";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldImage } from "next-cloudinary";

// Placeholder local para quando o veículo não tem imagem
const PLACEHOLDER_IMAGE = "/placeholder-vehicle.webp";

// Fix #7: mutation unificada para salvar/remover favoritos
const VehicleCard = ({ vehicle, userId = null, priority = false }) => {
  const [isSaved, setIsSaved] = useState(vehicle.wishListed);
  // Fix #8: useEffect removido — useState(vehicle.wishListed) garante sincronização no mount
  const queryClient = useQueryClient();

  const toggleFavoriteMutation = useMutation({
    gcTime: 0,
    mutationFn: async ({ idUser, idVehicle, type }) => {
      const res =
        type === "save"
          ? await saveUserVehicles(idUser, idVehicle)
          : await unsaveUserVehicles(idUser, idVehicle);
      return { res, type };
    },
    onMutate: async ({ idVehicle, type }) => {
      if (type !== "unsave") return {};

      // Cancela qualquer re-fetch em andamento para o cache não sobrescrever nosso update otimista
      await queryClient.cancelQueries({ queryKey: ["savedVehicles"] });

      // Faz snapshot do estado anterior para rollback em caso de erro
      const previousSaved = queryClient.getQueryData(["savedVehicles"]);

      // Remove o veículo do cache instantaneamente
      queryClient.setQueryData(["savedVehicles"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: (old.data || []).filter((v) => v.id !== idVehicle),
        };
      });

      return { previousSaved };
    },
    onSuccess: ({ res, type }) => {
      if (res.success) {
        const saving = type === "save";
        setIsSaved(saving);
        toast.success(
          saving ? "Veículo salvo nos favoritos!" : "Veículo removido dos favoritos!"
        );
        // Invalida para garantir consistência com o servidor após a mutation
        queryClient.invalidateQueries({ queryKey: ["savedVehicles"] });
        queryClient.invalidateQueries({ queryKey: ["featuredVehicles"] });
      } else {
        const msg =
          type === "save"
            ? res.message || "Veículo já está nos favoritos"
            : res.error || "Veículo não estava nos favoritos";
        toast.info(msg);
      }
    },
    onError: (error, { type }, context) => {
      toast.error(
        type === "save"
          ? `Falha ao salvar o veículo: ${error.message}`
          : `Falha ao remover o veículo: ${error.message}`
      );
      // Reverter estado local
      setIsSaved(type !== "save");
      // Restaurar o cache anterior (rollback otimista)
      if (context?.previousSaved !== undefined) {
        queryClient.setQueryData(["savedVehicles"], context.previousSaved);
      }
    },
    onSettled: () => {
      // Garante sincronização final independentemente do resultado
      queryClient.invalidateQueries({ queryKey: ["savedVehicles"] });
    },
  });

  const handleToggledSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("É necessário se cadastrar e autenticar para salvar seus veículos favoritos.");
      return;
    }

    if (toggleFavoriteMutation.isPending) return;

    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    toggleFavoriteMutation.mutate({
      idUser: userId,
      idVehicle: vehicle.id,
      type: newSavedState ? "save" : "unsave",
    });
  };

  const isSold = vehicle.status === "Vendido";

  return (
    <div className={`bg-white rounded-lg shadow-md border overflow-hidden group ${isSold ? "opacity-75" : "hover:shadow-lg transition-shadow duration-300"}`}>
      {/* Imagem */}
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <Link href={`/vehicles/${vehicle.id}`} className={isSold ? "pointer-events-none" : ""}>
          <CldImage
            src={
              vehicle.images?.[0] ||
              PLACEHOLDER_IMAGE  // Fix #10: placeholder local em vez de via.placeholder.com
            }
            alt={`${vehicle.vehicleBrand} ${vehicle.model}`}
            width={400}
            height={240}
            crop="fill"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`w-full h-full object-cover transition-transform duration-300 ${!isSold && "group-hover:scale-105"} ${isSold && "grayscale-[50%]"}`}
          />
        </Link>
        <div className="absolute top-2 right-3 z-10">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full shadow-sm bg-white/80 backdrop-blur-sm p-1.5 ${isSaved
              ? "text-red-500 hover:text-red-600 hover:bg-white transition-colors"
              : "text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
              }`}
            onClick={handleToggledSaved}
            disabled={toggleFavoriteMutation.isPending}
            aria-label={isSaved ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={isSaved ? "fill-red-500" : ""} size={20} />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
          {isSold ? (
            <div className="flex flex-col gap-1 items-start">
              <Badge className="bg-red-600 text-white hover:bg-red-700 text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-md">
                Vendido
              </Badge>
              {vehicle.sale?.saleDate && (
                <Badge className="bg-gray-800/80 text-white text-[9px] px-2 py-0.5 backdrop-blur-sm border-0">
                  {vehicle.sale.deliveryDate
                    ? `Entregue em ${new Date(vehicle.sale.deliveryDate).toLocaleDateString('pt-BR')}`
                    : `Vendido em ${new Date(vehicle.sale.saleDate).toLocaleDateString('pt-BR')}`
                  }
                </Badge>
              )}
            </div>
          ) : (
            vehicle.featured && (
              <Badge className="text-yellow-700 text-xs font-medium bg-yellow-100/90 backdrop-blur-sm hover:bg-yellow-200 shadow-sm border-0">
                <Star className="text-yellow-600 mr-1.5 fill-current" size={12} />
                Destaque
              </Badge>
            )
          )}
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
          {vehicle.vehicleBrand} {vehicle.model}
        </h3>

        <div className="mb-3">
          <div className="text-2xl font-bold text-blue-600">
            R$ {parseFloat(vehicle.price).toLocaleString("pt-BR")}
          </div>
        </div>

        {/* Informações */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{vehicle.year}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MotorizationEngine className="h-4 w-4 mr-2" />
            <span>{vehicle.engineSize}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Gauge className="h-4 w-4 mr-2" />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="text-xs">
            {vehicle.vehicleType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {vehicle.fuelType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {vehicle.transmission}
          </Badge>
        </div>

        {/* Botão */}
        <Link href={`/vehicles/${vehicle.id}`} className={isSold ? "pointer-events-none" : ""}>
          <Button
            className={`w-full py-6 text-md ${isSold ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300" : ""}`}
            size="sm"
            disabled={isSold}
          >
            {isSold ? "Indisponível" : "Ver Detalhes"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
