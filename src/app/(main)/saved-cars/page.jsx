// app/saved-cars/page.js
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserSavedVehicles } from "@/actions/vehicleCatalog";
import { checkUser } from "@/lib/checkUser";
import VehicleCard from "@/components/VehicleCard";
import { toast } from "sonner";
import { Heart, Car, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SavedCarsPage() {
  // Buscar veículos salvos do usuário
  const {
    data: savedVehicles,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["savedVehicles"],
    queryFn: async () => {
      const user = await checkUser();
      if (!user) {
        toast.error("É necessário fazer login para ver seus veículos favoritos");
        return [];
      }
      
      const response = await getUserSavedVehicles(user.id);
      if (!response.success) {
        console.error("Erro ao buscar veículos salvos:", response.message);
        return [];
      }
      return response.data || [];
    },
    staleTime: 1000 * 60 * 2, // Cache por 2 minutos
    onError: (error) => {
      console.error("Erro ao buscar veículos salvos:", error.message);
      toast.error("Erro ao carregar veículos favoritos");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative py-4 md:py-7 dotted-background">
          <div className="px-12 py-8">
            <div className="flex items-center justify-center mb-4">
              <Link href="/vehicles">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar aos Veículos
                </Button>
              </Link>
            </div>
            <h1 className="text-5xl text-white font-bold text-center mb-2">
              Meus Veículos Favoritos
            </h1>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando seus veículos favoritos...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative py-4 md:py-7 dotted-background">
          <div className="px-12 py-8">
            <div className="flex items-center justify-center mb-4">
              <Link href="/vehicles">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar aos Veículos
                </Button>
              </Link>
            </div>
            <h1 className="text-5xl text-white font-bold text-center mb-2">
              Meus Veículos Favoritos
            </h1>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Erro ao carregar favoritos
              </h3>
              <p className="text-gray-600 mb-4">
                Não foi possível carregar seus veículos favoritos.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => refetch()}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Tentar novamente
                </button>
                <Link href="/vehicles">
                  <Button variant="outline">
                    Explorar Veículos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-4 md:py-7 dotted-background">
        <div className="px-12 py-8">
          <div className="flex items-center justify-center mb-4">
            <Link href="/vehicles">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Veículos
              </Button>
            </Link>
          </div>
          <h1 className="text-5xl text-white font-bold text-center mb-2">
            Meus Veículos Favoritos
          </h1>
          <p className="text-white/80 text-center text-lg">
            {savedVehicles?.length || 0} veículo{(savedVehicles?.length || 0) !== 1 ? 's' : ''} salvo{(savedVehicles?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {!savedVehicles || savedVehicles.length === 0 ? (
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
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Explorar Veículos
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}