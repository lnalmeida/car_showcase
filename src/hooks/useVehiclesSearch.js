"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllVehicles, getUserSavedVehicles } from "@/actions/vehicleCatalog";
import { processImageSearch } from "@/actions/home";
import { toast } from "sonner";
import { checkUser } from "@/lib/checkUser";

export function useVehicleSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [filters, setFilters] = useState({});
  const [isImageSearch, setIsImageSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Verificar usuário atual
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await checkUser();
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  // Busca todos os veículos do banco
  const {
    data: vehicleData,
    isFetching: loadingVehicles,
    refetch: refetchVehicles,
  } = useQuery({
    queryKey: ["allVehicles"],
    queryFn: async () => {
      const response = await getAllVehicles();
      if (!response.success) {
        const errorMsg = response.error || response.message || "Erro desconhecido";
        toast.error(
          "Erro ao buscar veículos: GetAllVehicles: " + errorMsg
        );
        console.error("Erro ao buscar veículos:", errorMsg);
        throw new Error(errorMsg);
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      toast.error("Erro ao buscar veículos: Falha no hook: " + error.message);
      console.error("Erro ao buscar veículos: falha no hook", error.message);
    },
  });

  // Busca veículos salvos do usuário
  const {
    data: savedVehiclesData,
    refetch: refetchSavedVehicles,
    isLoading: loadingSavedVehicles,
  } = useQuery({
    queryKey: ["savedVehicles", currentUser?.id],
    queryFn: async () => {
      if (!currentUser) return [];

      const response = await getUserSavedVehicles(currentUser.id);
      if (!response.success) {
        console.error("Erro ao buscar veículos salvos:", response.message);
        return [];
      }
      void("🔄 Veículos salvos carregados:", response.data?.length || 0);
      return response.data || [];
    },
    enabled: !!currentUser, // Só executa se há usuário
    staleTime: 1000 * 60 * 1, // Cache por 1 minuto (reduzido para melhor sincronização)
    refetchOnWindowFocus: true, // Recarregar quando a janela ganhar foco
    onError: (error) => {
      console.error("Erro ao buscar veículos salvos:", error.message);
    },
  });

  // Combinar dados dos veículos com informações de salvos
  const vehiclesWithSavedStatus = useMemo(() => {
    if (!vehicleData) return [];

    const savedVehicleIds = new Set(
      savedVehiclesData?.map(sv => sv.id) || []
    );

    void("🔄 Sincronizando status de favoritos:", {
      totalVehicles: vehicleData.length,
      savedVehicleIds: Array.from(savedVehicleIds),
      loadingSavedVehicles
    });

    return vehicleData.map(vehicle => ({
      ...vehicle,
      wishListed: savedVehicleIds.has(vehicle.id)
    }));
  }, [vehicleData, savedVehiclesData, loadingSavedVehicles]);

  // Função para aplicar filtros progressivos (só para busca por imagem)
  const applyProgressiveFilters = useCallback((vehicles, filters) => {
    const { category, vehicleType, vehicleBrand, model, type } = filters;
    const typeToSearch = vehicleType || type;

    void("🔄 Iniciando busca progressiva com filtros:", filters);

    // 1️⃣ Primeiro: Tentar com todos os filtros (categoria + tipo + marca + modelo)
    let results = [...vehicles];

    // Filtrar por categoria (sempre obrigatório)
    if (category) {
      results = results.filter(
        (v) => v.category?.toLowerCase() === category.toLowerCase()
      );
      void(`  Após categoria (${category}): ${results.length} veículos`);
    }

    // Filtrar por tipo
    if (typeToSearch) {
      results = results.filter((v) =>
        v.vehicleType?.toLowerCase().includes(typeToSearch.toLowerCase())
      );
      void(`  Após tipo (${typeToSearch}): ${results.length} veículos`);
    }

    // Se temos resultados só com categoria e tipo, vamos tentar adicionar marca
    if (
      results.length > 0 &&
      vehicleBrand &&
      vehicleBrand !== "Não identificado"
    ) {
      const withBrand = results.filter((v) =>
        v.vehicleBrand?.toLowerCase().includes(vehicleBrand.toLowerCase())
      );

      if (withBrand.length > 0) {
        results = withBrand;
        void(
          `  ✅ Com marca (${vehicleBrand}): ${results.length} veículos`
        );

        // Se temos resultados com marca, tentar adicionar modelo
        if (model) {
          const withModel = results.filter((v) =>
            v.model?.toLowerCase().includes(model.toLowerCase())
          );

          if (withModel.length > 0) {
            results = withModel;
            void(
              `  ✅ Com modelo (${model}): ${results.length} veículos`
            );
          } else {
            void(
              `  ⚠️ Modelo '${model}' não encontrado, mantendo só marca`
            );
          }
        }
      } else {
        void(
          `  ⚠️ Marca '${vehicleBrand}' não encontrada, ignorando marca e modelo`
        );
        // Manter results sem filtro de marca
      }
    }

    // Se não encontrou nada até agora, tentar só categoria
    if (results.length === 0 && category) {
      results = vehicles.filter(
        (v) => v.category?.toLowerCase() === category.toLowerCase()
      );
      void(
        `  🔄 Fallback: Apenas categoria (${category}): ${results.length} veículos`
      );
    }

    void(
      `📊 Busca progressiva finalizada: ${results.length} veículos encontrados`
    );
    return results;
  }, []);

  // Filtrar os veículos em memória
  const filteredVehicles = useMemo(() => {
    if (!vehiclesWithSavedStatus) return [];

    let vehicles = [...vehiclesWithSavedStatus];

    // Log para debug
    void("📊 Total inicial de veículos:", vehicles.length);
    void("🔍 SearchTerm atual:", searchTerm);
    void("🎯 Filtros ativos:", filters);
    void("🖼️ É busca por imagem?", isImageSearch);

    if (isImageSearch && filters && Object.keys(filters).length > 0) {
      return applyProgressiveFilters(vehicles, filters);
    }

    // 1️⃣ PRIMEIRO: Aplicar filtros se existirem
    if (filters && Object.keys(filters).length > 0) {
      const { category, vehicleType, vehicleBrand, model, type } = filters;

      if (category) {
        vehicles = vehicles.filter(
          (v) => v.category?.toLowerCase() === category.toLowerCase()
        );
        void(`✅ Após filtro category (${category}):`, vehicles.length);
      }

      // Tratar tanto vehicleType quanto type (da IA)
      if (vehicleType || type) {
        const typeToSearch = (vehicleType || type).toLowerCase();
        vehicles = vehicles.filter((v) =>
          v.vehicleType?.toLowerCase().includes(typeToSearch)
        );
        void(`✅ Após filtro type (${typeToSearch}):`, vehicles.length);
      }

      if (vehicleBrand) {
        vehicles = vehicles.filter((v) =>
          v.vehicleBrand?.toLowerCase().includes(vehicleBrand.toLowerCase())
        );
        void(`✅ Após filtro brand (${vehicleBrand}):`, vehicles.length);
      }

      if (model) {
        vehicles = vehicles.filter((v) =>
          v.model?.toLowerCase().includes(model.toLowerCase())
        );
        void(`✅ Após filtro model (${model}):`, vehicles.length);
      }
    }

    // 2️⃣ DEPOIS: Aplicar busca por texto se existir
    if (searchTerm && searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase().trim();

      vehicles = vehicles.filter((v) => {
        const matchFound =
          v.model?.toLowerCase().includes(search) ||
          v.vehicleBrand?.toLowerCase().includes(search) ||
          v.category?.toLowerCase().includes(search) ||
          v.vehicleType?.toLowerCase().includes(search) ||
          v.description?.toLowerCase().includes(search) ||
          v.color?.toLowerCase().includes(search) ||
          v.fuelType?.toLowerCase().includes(search) ||
          v.transmission?.toLowerCase().includes(search) ||
          v.year?.toString().includes(search) ||
          `${v.vehicleBrand} ${v.model}`.toLowerCase().includes(search);

        return matchFound;
      });

      void(`✅ Após busca por texto (${search}):`, vehicles.length);
    }

    void("📦 Total final filtrado:", vehicles.length);
    return vehicles;
  }, [
    vehiclesWithSavedStatus,
    filters,
    searchTerm,
    isImageSearch,
    applyProgressiveFilters,
  ]);

  // Busca por imagem (IA) e gera filtros
  const imageSearchMutation = useMutation({
    mutationFn: async (file) => {
      const result = await processImageSearch(file);
      void("🔄 Resultado do processImageSearch:", result);

      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    onSuccess: (iaData) => {
      void("🤖 Dados recebidos da IA:", iaData);
      toast.success("Características identificadas pela imagem!");
      // Limpar busca por texto
      setSearchTerm("");

      // Montar filtros baseados na resposta da IA
      const newFilters = {};

      // IMPORTANTE: A IA retorna "brand", não "vehicleBrand"
      if (iaData.category) {
        newFilters.category = iaData.category;
        void("  ✓ Adicionando category:", iaData.category);
      }
      if (iaData.brand) {
        newFilters.vehicleBrand = iaData.brand; // Mapear brand -> vehicleBrand
        void("  ✓ Adicionando vehicleBrand:", iaData.brand);
      }
      if (iaData.type) {
        newFilters.type = iaData.type; // Será tratado como vehicleType no filtro
        void("  ✓ Adicionando type:", iaData.type);
      }

      void("🎯 Filtros finais a serem aplicados:", newFilters);
      setFilters(newFilters);
      setIsImageSearch(true);
      void("🎯 Filtros aplicados da IA:", newFilters);

      setTimeout(() => {
        void("🔍 Filtros após 100ms:", filters);
      }, 100);
    },
    onError: (err) => {
      toast.error("Erro ao processar imagem: erro na mutation: " + err.message);
      setFilters({});
      setIsImageSearch(false);
    },
  });

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm("");
    setImageFile(null);
    setIsImageSearch(false);
    void("🧹 Todos os filtros limpos");
  }, []);

  const searchByImage = useCallback(
    (file, options) => {
      imageSearchMutation.mutate(file, options);
    },
    [imageSearchMutation]
  );

  const applyManualFilter = useCallback((newFilters) => {
    setFilters(newFilters);
    setSearchTerm("");
    setIsImageSearch(false);
    void("🎯 Filtros manuais aplicados:", newFilters);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    imageFile,
    setImageFile,
    filters,
    setFilters,
    clearFilters,
    applyManualFilter,
    searchByImage,
    loadingImage: imageSearchMutation.isPending,
    loadingVehicles,
    filteredVehicles,
    refetchVehicles,
    refetchSavedVehicles,
    setIsImageSearch,
  };
}
