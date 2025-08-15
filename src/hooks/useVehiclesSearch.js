"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllVehicles } from "@/actions/vehicleCatalog";
import { processImageSearch } from "@/actions/home";
import { toast } from "sonner";

export function useVehicleSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [filters, setFilters] = useState({});

  // Busca todos os veículos do banco
  const {
    data: vehicleData,
    isFetching: loadingVehicles,
    refetch,
  } = useQuery({
    queryKey: ["allVehicles"],
    queryFn: getAllVehicles,
    staleTime: 1000 * 60 * 5,
  });

  // Filtrar os veículos em memória com base nos filtros atuais
  const filteredVehicles = vehicleData?.success
    ? vehicleData.data.filter((vehicle) => {
      if (!filters || Object.keys(filters).length === 0) return true;

      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return (
          vehicle[key] &&
          vehicle[key].toLowerCase().includes(value.toLowerCase())
        );
      });
    })
    : [];

  // Busca por imagem (IA) e gera filtros
  const imageSearch = useMutation({
    mutationFn: async (file) => {
      const result = await processImageSearch(file);
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    onSuccess: (data) => {
      toast.success("Características identificadas pela imagem!");
      setFilters(data);
    },
    onError: (err) => {
      toast.error("Erro ao processar imagem: " + err.message);
    },
  });

  // Aplicar filtro manual por texto
  const applyTextSearch = () => {
    if (!searchTerm.trim()) {
      toast.error("Digite algo para buscar");
      return;
    }

    // Vamos tentar aplicar o texto ao brand, model, type ou color
    const term = searchTerm.trim().toLowerCase();
    setFilters({
      vehicleBrand: term,
      model: term,
      type: term,
      color: term,
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    imageFile,
    setImageFile,
    filters,
    setFilters,
    applyTextSearch,
    searchByImage: imageSearch.mutate,
    loadingImage: imageSearch.isLoading,
    loadingVehicles,
    filteredVehicles,
    refetchVehicles: refetch,
  };
}
