"use client";

import React from "react";
import { useState, useEffect } from "react";

import { Calendar, Gauge, Star } from "lucide-react";
import { MotorizationEngine } from "@/assets/icons/icons";

import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { saveUserVehicles, unsaveUserVehicles } from "@/actions/vehicleCatalog";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const VehicleCard = ({ vehicle }) => {
  const [isSaved, setIsSaved] = useState(vehicle.wishListed);
  const queryClient = useQueryClient();

  // Sincronizar estado local com prop quando ela mudar
  useEffect(() => {
    setIsSaved(vehicle.wishListed);
  }, [vehicle.wishListed]);


  const favoriteVehicleMutation = useMutation({
    gcTime: 0,
    mutationFn: async ({ idUser, idVehicle }) => {
      const res = await saveUserVehicles(idUser, idVehicle);
      console.log(`favoriteVehicleMutation => userID: ${idUser} / vehicleID: ${idVehicle}`, res);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        vehicle.wishListed = true;
        toast.success("Veículo salvo nos favoritos!");
        setIsSaved(true);
        // Invalidar cache dos veículos salvos e em destaque para recarregar
        queryClient.invalidateQueries({ queryKey: ["savedVehicles"] });
        queryClient.invalidateQueries({ queryKey: ["featuredVehicles"] });
      } else {
        toast.info(data.message || "Veículo já está nos favoritos");
      }
    },
    onError: (error) => {
      toast.error(`Falha ao salvar o veículo: ${error.message}`);
      console.error("Erro ao favoritar:", error);
      setIsSaved(false); // Reverter estado em caso de erro
    }
  });

  const unfavoriteVehicleMutation = useMutation({
    gcTime: 0,
    mutationFn: async ({ idUser, idVehicle }) => {
      const res = await unsaveUserVehicles(idUser, idVehicle);
      console.log(`unfavoriteVehicleMutation => userID: ${idUser} / vehicleID: ${idVehicle}`, res);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        vehicle.wishListed = false;
        toast.success("Veículo removido dos favoritos!");
        setIsSaved(false);
        // Invalidar cache dos veículos salvos e em destaque para recarregar
        queryClient.invalidateQueries({ queryKey: ["savedVehicles"] });
        queryClient.invalidateQueries({ queryKey: ["featuredVehicles"] });
      } else {
        toast.warning(data.error || "Veículo não estava nos favoritos");
      }
    },
    onError: (error) => {
      toast.error(`Falha ao remover o veículo: ${error.message}`);
      console.error("Erro ao desfavoritar:", error);
      setIsSaved(true); // Reverter estado em caso de erro
    }
  });

  const handleToggledSaved = async () => {
    const user = await checkUser();
    if (!user) {
      toast.error("É necessário se cadastrar e autenticar para salvar seus veículos favoritos.");
      console.error("Usuário não autenticado. Ação de salvar cancelada.");
      return;
    }

    // Atualizar estado otimisticamente
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    if (newSavedState) {
      favoriteVehicleMutation.mutate({ idUser: user.id, idVehicle: vehicle.id });
    } else {
      unfavoriteVehicleMutation.mutate({ idUser: user.id, idVehicle: vehicle.id });
    };
  };



  // Check if vehicle is sold
  const isSold = vehicle.status === "Vendido";

  return (
    <div className={`bg-white rounded-lg shadow-md border overflow-hidden group ${isSold ? "opacity-75" : "hover:shadow-lg transition-shadow duration-300"}`}>
      {/* Imagem */}
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <Link href={`/vehicles/${vehicle.id}`} className={isSold ? "pointer-events-none" : ""}>
          <img
            src={
              vehicle.images?.[0] ||
              `https://via.placeholder.com/400x240/e2e8f0/64748b?text=${vehicle.vehicleBrand}+${vehicle.model}`
            }
            alt={`${vehicle.vehicleBrand} ${vehicle.model}`}
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
          >
            <Heart className={isSaved ? "fill-red-500" : ""} size={20} />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
          {isSold ? (
            <Badge className="bg-red-600 text-white hover:bg-red-700 text-xs font-bold px-2 py-1 uppercase tracking-wider shadow-md">
              Vendido
            </Badge>
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

          {/* {vehicle.mileage > 0 && ( */}
          <div className="flex items-center text-sm text-gray-600">
            <Gauge className="h-4 w-4 mr-2" />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </div>
          {/*   )*/}
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
