"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserSavedVehicles } from "@/actions/vehicleCatalog";
import VehicleCard from "@/components/VehicleCard";
import { Heart, Car, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Client Component — usa TanStack Query com a chave ["savedVehicles"].
 *
 * O VehicleCard, ao remover um favorito, chama:
 *   queryClient.invalidateQueries({ queryKey: ["savedVehicles"] })
 *
 * Como este componente assina a mesma chave, a lista é
 * recarregada automaticamente e o card some sem precisar
 * de reload da página.
 */
const SavedVehiclesList = ({ userId, initialData }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["savedVehicles"],
    queryFn: () => getUserSavedVehicles(userId),
    initialData: initialData
      ? { success: true, data: initialData }
      : undefined,
    // Revalida ao ganhar foco e ao reconectar para manter
    // a lista sempre atualizada sem inputs adicionais do usuário
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-500">Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Erro ao carregar favoritos
          </h3>
          <p className="text-gray-600 mb-4">
            {error?.message || data?.message || "Não foi possível carregar seus veículos favoritos."}
          </p>
          <Link href="/vehicles">
            <Button variant="outline">Explorar Veículos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const savedVehicles = data?.data || [];

  if (savedVehicles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Nenhum veículo favorito
          </h3>
          <p className="text-gray-600 mb-4">
            Você ainda não salvou nenhum veículo como favorito.
          </p>
          <Link href="/vehicles">
            <Button className="bg-black hover:bg-zinc-800">
              Explorar Veículos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {savedVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} userId={userId} />
      ))}
    </div>
  );
};

export default SavedVehiclesList;
