"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeaturedVehicles } from "@/actions/home";
import { getUserSavedVehicles } from "@/actions/vehicleCatalog";
import { checkUser } from "@/lib/checkUser";
import { toast } from "sonner";

export function useFeaturedVehicles(limit = 8) {
  const [currentUser, setCurrentUser] = useState(null);
  const queryClient = useQueryClient();

  // Verificar usuário atual
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await checkUser();
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  // Buscar veículos em destaque
  const {
    data: featuredVehicles,
    isLoading: loadingFeaturedVehicles,
    error: featuredVehiclesError,
    refetch: refetchFeaturedVehicles,
  } = useQuery({
    queryKey: ["featuredVehicles", currentUser?.id],
    queryFn: async () => {
      const userId = currentUser?.id || null;
      const res = await getFeaturedVehicles(limit, userId);
      
      if (!res.success) {
        if (res.message === "Não há veículos em destaque") {
          return [];
        }
        throw new Error(res.message);
      }
      
      return res.data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    refetchOnWindowFocus: false,
    onError: (error) => {
      toast.error(`Falha ao carregar veículos em destaque: ${error.message}`);
      console.error("Erro ao carregar veículos em destaque:", error);
    },
  });

  // Função para invalidar cache quando favoritos mudarem
  const invalidateFeaturedVehicles = () => {
    queryClient.invalidateQueries({ queryKey: ["featuredVehicles"] });
  };

  return {
    featuredVehicles: featuredVehicles || [],
    loadingFeaturedVehicles,
    featuredVehiclesError,
    refetchFeaturedVehicles,
    invalidateFeaturedVehicles,
    currentUser,
  };
}