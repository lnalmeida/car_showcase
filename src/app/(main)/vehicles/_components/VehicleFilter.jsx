import React, { useState, useMemo, useEffect } from "react";
import {
  Car,
  Bike,
  X,
  CarFront,
  DollarSign,
  Calendar,
  Gauge,
  Tag,
  Package,
  Zap,
  Settings,
  Fuel,
  Search,
  MapPin,
  Star,
  ListFilter,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  carTypeOptions as carTypes,
  motorcycleTypeOptions as motorcycleTypes,
  carBrandOptions as carBrands,
  motorcycleBrandOptions as motorcycleBrands,
  carTransmissionTypeOptions as carTransmissions,
  motorcycleTransmissionTypeOptions as motoTransmissioins,
  carFuelTypeOptions as carFuelType,
  motorcycleFuelTypeOptions as motoFuelTypes,
} from "@/app/(admin)/admin/vehicles/_constants/constants";

import { ManualTransmissions, MotorizationEngine } from "@/assets/icons/icons";
import { useRouter } from "next/navigation";

// DADOS ESTÁTICOS
const STATIC_DATA = {
  categories: ["todos", "carros", "motos"],

  vehicleTypes: {
    carros: [...carTypes],
    motos: [...motorcycleTypes],
  },

  brands: {
    carros: [...carBrands],
    motos: [...motorcycleBrands],
  },

  transmissions: {
    carros: [...carTransmissions],
    motos: [...motoTransmissioins],
  },

  fuels: {
    carros: [...carFuelType],
    motos: [...motoFuelTypes],
  },
};

const VehicleFilter = ({ data = [], CardComponent = null, className }) => {
  const router = useRouter();
  // Gera configuração baseada nos dados + dados estáticos
  const filterConfig = useMemo(() => {
    if (!data.length) {
      return {
        ...STATIC_DATA,
        models: {},
        engines: { carros: [], motos: [] },
        priceRange: { min: 0, max: 100000, step: 1000 },
        yearRange: { min: 2000, max: 2025 },
        odometerRange: { min: 0, max: 250000, step: 5000 },
      };
    }

    // Gera modelos por marca (dinâmico)
    const models = {};
    [...new Set(data.map((v) => v.vehicleBrand))].forEach((brand) => {
      models[brand] = [
        ...new Set(
          data.filter((v) => v.vehicleBrand === brand).map((v) => v.model)
        ),
      ];
    });

    // Gera engines por categoria (dinâmico)
    const engines = {};
    STATIC_DATA.categories.slice(1).forEach((cat) => {
      const originalCat = cat === "carros" ? "Carro" : "Moto";
      const categoryVehicles = data.filter((v) => v.category === originalCat);
      engines[cat] = [...new Set(categoryVehicles.map((v) => v.engineSize))];
    });

    // Calcular faixas de valores (dinâmico)
    const prices = data.map((v) => parseFloat(v.price));
    const years = data.map((v) => v.year);

    return {
      ...STATIC_DATA,
      models,
      engines,
      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices),
        step: 1000,
      },
      yearRange: {
        min: Math.min(...years),
        max: Math.max(...years),
      },
      odometerRange: {
        min: 0,
        max: 250000,
        step: 5000,
      },
    };
  }, [data]);

  // Função para ler parâmetros da URL
  const getFiltersFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filtersFromURL = {};

    // Mapear parâmetros da URL para filtros
    if (urlParams.get("category")) {
      const categoryValue = urlParams.get("category").toLowerCase();
      if (categoryValue === "carro") {
        filtersFromURL.category = "carros";
      } else if (categoryValue === "moto") {
        filtersFromURL.category = "motos";
      } else {
        filtersFromURL.category = categoryValue + "s";
      }
    }

    if (urlParams.get("type"))
      filtersFromURL.vehicleType = urlParams.get("type");
    if (urlParams.get("brand")) filtersFromURL.brand = urlParams.get("brand");
    if (urlParams.get("model")) filtersFromURL.model = urlParams.get("model");
    if (urlParams.get("engine"))
      filtersFromURL.engine = urlParams.get("engine");
    if (urlParams.get("transmission"))
      filtersFromURL.transmission = urlParams.get("transmission");
    if (urlParams.get("fuel")) filtersFromURL.fuel = urlParams.get("fuel");

    // Parâmetros alternativos (português)
    if (urlParams.get("categoria"))
      filtersFromURL.category = urlParams.get("categoria");
    if (urlParams.get("tipo"))
      filtersFromURL.vehicleType = urlParams.get("tipo");
    if (urlParams.get("marca")) filtersFromURL.brand = urlParams.get("marca");
    if (urlParams.get("modelo")) filtersFromURL.model = urlParams.get("modelo");
    if (urlParams.get("motor")) filtersFromURL.engine = urlParams.get("motor");
    if (urlParams.get("cambio"))
      filtersFromURL.transmission = urlParams.get("cambio");
    if (urlParams.get("combustivel"))
      filtersFromURL.fuel = urlParams.get("combustivel");

    // Busca por texto: parâmetro 'search'
    if (urlParams.get("search"))
      filtersFromURL.searchText = urlParams.get("search");
    if (urlParams.get("busca"))
      filtersFromURL.searchText = urlParams.get("busca");

    // Faixas de valores
    if (urlParams.get("preco_max") || urlParams.get("maxPrice")) {
      const precoMax = parseInt(
        urlParams.get("preco_max") || urlParams.get("maxPrice")
      );
      filtersFromURL.priceRange = [filterConfig.priceRange.min, precoMax];
    }

    if (
      urlParams.get("ano_min") ||
      urlParams.get("ano_max") ||
      urlParams.get("minYear") ||
      urlParams.get("maxYear")
    ) {
      const anoMin =
        parseInt(urlParams.get("ano_min") || urlParams.get("minYear")) ||
        filterConfig.yearRange.min;
      const anoMax =
        parseInt(urlParams.get("ano_max") || urlParams.get("maxYear")) ||
        filterConfig.yearRange.max;
      filtersFromURL.yearRange = [anoMin, anoMax];
    }

    if (urlParams.get("km_max") || urlParams.get("maxMileage")) {
      const kmMax = parseInt(
        urlParams.get("km_max") || urlParams.get("maxMileage")
      );
      filtersFromURL.odometerRange = [0, kmMax];
    }

    return filtersFromURL;
  };

  // Função para atualizar URL com os filtros atuais
  const updateURL = (filters) => {
    const urlParams = new URLSearchParams();
    const currentParams = new URLSearchParams(window.location.search);

    // Mantem parâmetros especiais se existirem
    if (currentParams.get("fromImage")) {
      urlParams.set("fromImage", "true");
    }

    // Adicionar apenas filtros que não são valores padrão
    if (filters.category && filters.category !== "todos") {
      // Usar o formato da URL original se vier de busca por imagem
      if (currentParams.get("fromImage") || currentParams.get("category")) {
        if (filters.category === "carros") {
          urlParams.set("category", "Carro");
        } else if (filters.category === "motos") {
          urlParams.set("category", "Moto");
        } else {
          urlParams.set("category", filters.category);
        }
      } else {
        urlParams.set("categoria", filters.category);
      }
    }

    if (filters.vehicleType && filters.vehicleType !== "all-types") {
      if (currentParams.get("fromImage") || currentParams.get("type")) {
        urlParams.set("type", filters.vehicleType);
      } else {
        urlParams.set("tipo", filters.vehicleType);
      }
    }

    if (filters.brand && filters.brand !== "all-brands") {
      if (currentParams.get("fromImage") || currentParams.get("brand")) {
        urlParams.set("brand", filters.brand);
      } else {
        urlParams.set("marca", filters.brand);
      }
    }

    if (filters.model && filters.model !== "all-models") {
      if (currentParams.get("fromImage") || currentParams.get("model")) {
        urlParams.set("model", filters.model);
      } else {
        urlParams.set("modelo", filters.model);
      }
    }

    if (filters.engine && filters.engine !== "all-engines") {
      if (currentParams.get("fromImage") || currentParams.get("engine")) {
        urlParams.set("engine", filters.engine);
      } else {
        urlParams.set("motor", filters.engine);
      }
    }

    if (filters.transmission && filters.transmission !== "all-transmissions") {
      if (currentParams.get("fromImage") || currentParams.get("transmission")) {
        urlParams.set("transmission", filters.transmission);
      } else {
        urlParams.set("cambio", filters.transmission);
      }
    }

    if (filters.fuel && filters.fuel !== "all-fuels") {
      if (currentParams.get("fromImage") || currentParams.get("fuel")) {
        urlParams.set("fuel", filters.fuel);
      } else {
        urlParams.set("combustivel", filters.fuel);
      }
    }

    if (filters.searchText && filters.searchText.trim()) {
      urlParams.set("search", filters.searchText);
    }

    if (
      filters.priceRange &&
      filters.priceRange[1] < filterConfig.priceRange.max
    ) {
      if (currentParams.get("fromImage") || currentParams.get("maxPrice")) {
        urlParams.set("maxPrice", filters.priceRange[1].toString());
      } else {
        urlParams.set("preco_max", filters.priceRange[1].toString());
      }
    }

    if (
      filters.yearRange &&
      (filters.yearRange[0] > filterConfig.yearRange.min ||
        filters.yearRange[1] < filterConfig.yearRange.max)
    ) {
      if (
        currentParams.get("fromImage") ||
        currentParams.get("minYear") ||
        currentParams.get("maxYear")
      ) {
        urlParams.set("minYear", filters.yearRange[0].toString());
        urlParams.set("maxYear", filters.yearRange[1].toString());
      } else {
        urlParams.set("ano_min", filters.yearRange[0].toString());
        urlParams.set("ano_max", filters.yearRange[1].toString());
      }
    }

    if (filters.odometerRange && filters.odometerRange[1] < 250000) {
      if (currentParams.get("fromImage") || currentParams.get("maxMileage")) {
        urlParams.set("maxMileage", filters.odometerRange[1].toString());
      } else {
        urlParams.set("km_max", filters.odometerRange[1].toString());
      }
    }

    // Atualizar URL sem recarregar a página
    const newURL = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;
    window.history.pushState({}, "", newURL);
  };

  // Estado dos filtros
  const [filters, setFilters] = useState({
    category: "todos",
    vehicleType: "all-types",
    priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
    yearRange: [filterConfig.yearRange.min, filterConfig.yearRange.max],
    odometerRange: [0, 250000],
    brand: "all-brands",
    model: "all-models",
    engine: "all-engines",
    transmission: "all-transmissions",
    fuel: "all-fuels",
    searchText: "",
  });

  // Filtros ativos para exibição
  const [activeFilters, setActiveFilters] = useState([]);

  //Estado pra controle  de exibição de menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //Prevenir Scroll do body enquanto o menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    //Cleanup
    return () => (document.body.style.overflow = "unset");
  }, [isMobileMenuOpen]);

  // Inicializar filtros baseados na URL quando o componente monta
  useEffect(() => {
    const urlFilters = getFiltersFromURL();
    if (Object.keys(urlFilters).length > 0) {
      const defaultFilters = {
        category: "todos",
        vehicleType: "all-types",
        priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
        yearRange: [filterConfig.yearRange.min, filterConfig.yearRange.max],
        odometerRange: [0, 250000],
        brand: "all-brands",
        model: "all-models",
        engine: "all-engines",
        transmission: "all-transmissions",
        fuel: "all-fuels",
        searchText: "",
      };

      const initialFilters = { ...defaultFilters, ...urlFilters };
      setFilters(initialFilters);

      // Calcular e definir filtros ativos baseados na URL
      const active = [];
      if (initialFilters.category !== filterConfig.categories[0]) {
        active.push({
          type: "category",
          label:
            initialFilters.category.charAt(0).toUpperCase() +
            initialFilters.category.slice(1),
        });
      }
      if (
        initialFilters.vehicleType &&
        initialFilters.vehicleType !== "all-types"
      ) {
        active.push({
          type: "vehicleType",
          label: initialFilters.vehicleType,
        });
      }
      if (
        initialFilters.priceRange &&
        initialFilters.priceRange[1] < filterConfig.priceRange.max
      ) {
        active.push({
          type: "priceRange",
          label: `R$ ${initialFilters.priceRange[1].toLocaleString()}`,
        });
      }
      if (
        initialFilters.yearRange &&
        (initialFilters.yearRange[0] > filterConfig.yearRange.min ||
          initialFilters.yearRange[1] < filterConfig.yearRange.max)
      ) {
        active.push({
          type: "yearRange",
          label: `${initialFilters.yearRange[0]} - ${initialFilters.yearRange[1]}`,
        });
      }
      if (
        initialFilters.odometerRange &&
        initialFilters.odometerRange[1] < 250000
      ) {
        active.push({
          type: "odometerRange",
          label: `${initialFilters.odometerRange[1].toLocaleString()} km`,
        });
      }
      if (initialFilters.brand && initialFilters.brand !== "all-brands") {
        active.push({
          type: "brand",
          label: initialFilters.brand,
        });
      }
      if (initialFilters.model && initialFilters.model !== "all-models") {
        active.push({
          type: "model",
          label: initialFilters.model,
        });
      }
      if (initialFilters.engine && initialFilters.engine !== "all-engines") {
        active.push({
          type: "engine",
          label: initialFilters.engine,
        });
      }
      if (
        initialFilters.transmission &&
        initialFilters.transmission !== "all-transmissions"
      ) {
        active.push({
          type: "transmission",
          label: initialFilters.transmission,
        });
      }
      if (initialFilters.fuel && initialFilters.fuel !== "all-fuels") {
        active.push({
          type: "fuel",
          label: initialFilters.fuel,
        });
      }
      if (initialFilters.searchText && initialFilters.searchText.trim()) {
        active.push({
          type: "searchText",
          label: `"${initialFilters.searchText}"`,
        });
      }

      setActiveFilters(active);
    }
  }, [filterConfig]);

  // useEffect para sincronizar com mudanças na URL (botão voltar/avançar)
  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFiltersFromURL();
      const defaultFilters = {
        category: "todos",
        vehicleType: "all-types",
        priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
        yearRange: [filterConfig.yearRange.min, filterConfig.yearRange.max],
        odometerRange: [0, 250000],
        brand: "all-brands",
        model: "all-models",
        engine: "all-engines",
        transmission: "all-transmissions",
        fuel: "all-fuels",
        searchText: "",
      };

      const newFilters = { ...defaultFilters, ...urlFilters };
      setFilters(newFilters);

      // Atualizar filtros ativos também
      updateActiveFilters(newFilters);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [filterConfig]);

  // Função para calcular e definir filtros ativos
  const updateActiveFilters = (filtersToCheck) => {
    const active = [];
    if (filtersToCheck.category !== filterConfig.categories[0]) {
      active.push({
        type: "category",
        label:
          filtersToCheck.category.charAt(0).toUpperCase() +
          filtersToCheck.category.slice(1),
      });
    }
    if (
      filtersToCheck.vehicleType &&
      filtersToCheck.vehicleType !== "all-types"
    ) {
      active.push({
        type: "vehicleType",
        label: filtersToCheck.vehicleType,
      });
    }
    if (filtersToCheck.priceRange[1] < filterConfig.priceRange.max) {
      active.push({
        type: "priceRange",
        label: `R$ ${filtersToCheck.priceRange[1].toLocaleString()}`,
      });
    }
    if (
      filtersToCheck.yearRange[0] > filterConfig.yearRange.min ||
      filtersToCheck.yearRange[1] < filterConfig.yearRange.max
    ) {
      active.push({
        type: "yearRange",
        label: `${filtersToCheck.yearRange[0]} - ${filtersToCheck.yearRange[1]}`,
      });
    }
    if (filtersToCheck.odometerRange[1] < 250000) {
      active.push({
        type: "odometerRange",
        label: `${filtersToCheck.odometerRange[1].toLocaleString()} km`,
      });
    }
    if (filtersToCheck.brand && filtersToCheck.brand !== "all-brands") {
      active.push({
        type: "brand",
        label: filtersToCheck.brand,
      });
    }
    if (filtersToCheck.model && filtersToCheck.model !== "all-models") {
      active.push({
        type: "model",
        label: filtersToCheck.model,
      });
    }
    if (filtersToCheck.engine && filtersToCheck.engine !== "all-engines") {
      active.push({
        type: "engine",
        label: filtersToCheck.engine,
      });
    }
    if (
      filtersToCheck.transmission &&
      filtersToCheck.transmission !== "all-transmissions"
    ) {
      active.push({
        type: "transmission",
        label: filtersToCheck.transmission,
      });
    }
    if (filtersToCheck.fuel && filtersToCheck.fuel !== "all-fuels") {
      active.push({
        type: "fuel",
        label: filtersToCheck.fuel,
      });
    }
    if (filtersToCheck.searchText && filtersToCheck.searchText.trim()) {
      active.push({
        type: "searchText",
        label: `"${filtersToCheck.searchText}"`,
      });
    }

    setActiveFilters(active);
  };

  // Função para atualizar filtros
  const updateFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    // Atualizar URL
    updateURL(updated);

    // Atualizar filtros ativos
    updateActiveFilters(updated);
  };

  // Limpar todos os filtros
  const clearAllFilters = () => {
    const clearedFilters = {
      category: filterConfig.categories[0] || "todos",
      vehicleType: "all-types",
      priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
      yearRange: [filterConfig.yearRange.min, filterConfig.yearRange.max],
      odometerRange: [0, 250000],
      brand: "all-brands",
      model: "all-models",
      engine: "all-engines",
      transmission: "all-transmissions",
      fuel: "all-fuels",
      searchText: "",
    };
    setFilters(clearedFilters);
    setActiveFilters([]);

    // Limpar URL (remover todos os parâmetros)
    window.history.pushState({}, "", window.location.pathname);
  };

  // Remover filtro específico
  const removeFilter = (filterType) => {
    let updatedFilters = { ...filters };

    switch (filterType) {
      case "category":
        updatedFilters.category = filterConfig.categories[0] || "todos";
        updatedFilters.vehicleType = "all-types";
        updatedFilters.brand = "all-brands";
        updatedFilters.model = "all-models";
        updatedFilters.engine = "all-engines";
        updatedFilters.transmission = "all-transmissions";
        updatedFilters.fuel = "all-fuels";
        break;
      case "vehicleType":
        updatedFilters.vehicleType = "all-types";
        break;
      case "priceRange":
        updatedFilters.priceRange = [
          filterConfig.priceRange.min,
          filterConfig.priceRange.max,
        ];
        break;
      case "yearRange":
        updatedFilters.yearRange = [
          filterConfig.yearRange.min,
          filterConfig.yearRange.max,
        ];
        break;
      case "odometerRange":
        updatedFilters.odometerRange = [0, 250000];
        break;
      case "brand":
        updatedFilters.brand = "all-brands";
        updatedFilters.model = "all-models";
        break;
      case "model":
        updatedFilters.model = "all-models";
        break;
      case "engine":
        updatedFilters.engine = "all-engines";
        break;
      case "transmission":
        updatedFilters.transmission = "all-transmissions";
        break;
      case "fuel":
        updatedFilters.fuel = "all-fuels";
        break;
      case "searchText":
        updatedFilters.searchText = "";
        break;
    }

    updateFilters(updatedFilters);
  };

  // Verificar se accordion tem filtros ativos
  const hasActiveFilter = (accordionType) => {
    switch (accordionType) {
      case "category":
        return filters.category !== filterConfig.categories[0];
      case "vehicle-type":
        return filters.vehicleType !== "all-types";
      case "price-range":
        return filters.priceRange[1] < filterConfig.priceRange.max;
      case "year-range":
        return (
          filters.yearRange[0] > filterConfig.yearRange.min ||
          filters.yearRange[1] < filterConfig.yearRange.max
        );
      case "odometer-range":
        return filters.odometerRange[1] < 250000;
      case "brand":
        return filters.brand !== "all-brands";
      case "model":
        return filters.model !== "all-models";
      case "engine":
        return filters.engine !== "all-engines";
      case "transmission":
        return filters.transmission !== "all-transmissions";
      case "fuel":
        return filters.fuel !== "all-fuels";
      default:
        return false;
    }
  };

  // Alterar categoria e resetar dependentes
  const handleCategoryChange = (category) => {
    updateFilters({
      category,
      vehicleType: "all-types",
      brand: "all-brands",
      model: "all-models",
      engine: "all-engines",
      transmission: "all-transmissions",
      fuel: "all-fuels",
    });
    if (filters.category === "todos") router.refresh();
  };

  // Obter opções disponíveis baseadas na categoria
  const getAvailableOptions = (type, currentCategory) => {
    const dataSource = filterConfig[type];
    if (!dataSource) return [];

    if (currentCategory === filterConfig.categories[0]) {
      return [...new Set(Object.values(dataSource).flat())];
    }

    return dataSource[currentCategory] || [];
  };

  const availableVehicleTypes = getAvailableOptions(
    "vehicleTypes",
    filters.category
  );
  const availableBrands = getAvailableOptions("brands", filters.category);
  const availableModels =
    filters.brand !== "all-brands"
      ? filterConfig.models[filters.brand] || []
      : [];
  const availableEngines = getAvailableOptions("engines", filters.category);
  const availableTransmissions = getAvailableOptions(
    "transmissions",
    filters.category
  );
  const availableFuels = getAvailableOptions("fuels", filters.category);

  // Filtrar dados baseado nos filtros atuais
  // const filteredVehicles = useMemo(() => {
  //   return data.filter((vehicle) => {
  //     const normalizedVehicleCategory = vehicle.category.toLowerCase() + "s";

  //     // Filtro de busca por texto
  //     if (filters.searchText && filters.searchText.trim()) {
  //       const searchTerm = filters.searchText.toLowerCase().trim();
  //       const searchableText = [
  //         vehicle.model,
  //         vehicle.vehicleBrand,
  //         vehicle.vehicleType,
  //         vehicle.fuelType,
  //         vehicle.transmission,
  //         vehicle.description,
  //       ]
  //         .join(" ")
  //         .toLowerCase();

  //       if (!searchableText.includes(searchTerm)) {
  //         return false;
  //       }
  //     }

  //     // Filtro de categoria
  //     if (
  //       filters.category !== "todos" &&
  //       normalizedVehicleCategory !== filters.category
  //     ) {
  //       return false;
  //     }

  //     // Filtro de tipo de veículo
  //     if (
  //       filters.vehicleType &&
  //       filters.vehicleType !== "all-types" &&
  //       vehicle.vehicleType !== filters.vehicleType
  //     ) {
  //       return false;
  //     }

  //     // Filtro de preço
  //     const vehiclePrice = parseFloat(vehicle.price);
  //     if (
  //       vehiclePrice < filters.priceRange[0] ||
  //       vehiclePrice > filters.priceRange[1]
  //     ) {
  //       return false;
  //     }

  //     // Filtro de ano
  //     if (
  //       vehicle.year < filters.yearRange[0] ||
  //       vehicle.year > filters.yearRange[1]
  //     ) {
  //       return false;
  //     }

  //     // Filtro de odômetro
  //     if (vehicle.mileage && vehicle.mileage > filters.odometerRange[1]) {
  //       return false;
  //     }

  //     // Filtro de marca
  //     if (
  //       filters.brand &&
  //       filters.brand !== "all-brands" &&
  //       vehicle.vehicleBrand !== filters.brand
  //     ) {
  //       return false;
  //     }

  //     // Filtro de modelo
  //     if (
  //       filters.model &&
  //       filters.model !== "all-models" &&
  //       vehicle.model !== filters.model
  //     ) {
  //       return false;
  //     }

  //     // Filtro de motorização
  //     if (
  //       filters.engine &&
  //       filters.engine !== "all-engines" &&
  //       vehicle.engineSize !== filters.engine
  //     ) {
  //       return false;
  //     }

  //     // Filtro de câmbio
  //     if (
  //       filters.transmission &&
  //       filters.transmission !== "all-transmissions" &&
  //       vehicle.transmission !== filters.transmission
  //     ) {
  //       return false;
  //     }

  //     // Filtro de combustível
  //     if (
  //       filters.fuel &&
  //       filters.fuel !== "all-fuels" &&
  //       vehicle.fuelType !== filters.fuel
  //     ) {
  //       return false;
  //     }

  //     return true;
  //   });
  // }, [data, filters]);

  const filteredVehicles = useMemo(() => {
    if (!data.length) return [];

    let vehicles = [...data];

    // Passo 1: Aplicar os filtros mais "fortes" (excluindo busca por texto e faixas de valores)
    const strongFilters = [
      { key: "category", value: filters.category, default: "todos" },
      { key: "vehicleType", value: filters.vehicleType, default: "all-types" },
      { key: "brand", value: filters.brand, default: "all-brands" },
      { key: "model", value: filters.model, default: "all-models" },
    ];

    let results = [...vehicles];
    let appliedStrongFilters = [];

    // Montar a lista de filtros fortes a serem aplicados
    for (const filter of strongFilters) {
      if (filter.value && filter.value !== filter.default) {
        appliedStrongFilters.push(filter);
      }
    }

    // Tentar com todos os filtros fortes aplicados
    let currentResults = [...vehicles];

    for (const filter of appliedStrongFilters) {
      const key = filter.key;
      const value = filter.value;

      if (key === "category") {
        currentResults = currentResults.filter(
          (v) => v.category?.toLowerCase() + "s" === value
        );
      } else if (key === "vehicleType") {
        currentResults = currentResults.filter((v) => v.vehicleType === value);
      } else if (key === "brand") {
        currentResults = currentResults.filter((v) => v.vehicleBrand === value);
      } else if (key === "model") {
        currentResults = currentResults.filter((v) => v.model === value);
      }
    }

    if (currentResults.length > 0) {
      results = currentResults;
    } else {
      // Fallback: tentar sem o filtro de modelo
      const lessSpecificFilters = appliedStrongFilters.filter(
        (f) => f.key !== "model"
      );
      currentResults = [...vehicles];
      for (const filter of lessSpecificFilters) {
        const key = filter.key;
        const value = filter.value;
        if (key === "category") {
          currentResults = currentResults.filter(
            (v) => v.category?.toLowerCase() + "s" === value
          );
        } else if (key === "vehicleType") {
          currentResults = currentResults.filter(
            (v) => v.vehicleType === value
          );
        } else if (key === "brand") {
          currentResults = currentResults.filter(
            (v) => v.vehicleBrand === value
          );
        }
      }
      if (currentResults.length > 0) {
        results = currentResults;
      } else {
        // Fallback: tentar apenas com categoria e tipo
        const leastSpecificFilters = appliedStrongFilters.filter(
          (f) => f.key !== "model" && f.key !== "brand"
        );
        currentResults = [...vehicles];
        for (const filter of leastSpecificFilters) {
          const key = filter.key;
          const value = filter.value;
          if (key === "category") {
            currentResults = currentResults.filter(
              (v) => v.category?.toLowerCase() + "s" === value
            );
          } else if (key === "vehicleType") {
            currentResults = currentResults.filter(
              (v) => v.vehicleType === value
            );
          }
        }
        results = currentResults;
      }
    }

    // Passo 2: Aplicar os outros filtros (motor, câmbio, combustível, etc.)
    results = results.filter((vehicle) => {
      if (
        filters.engine &&
        filters.engine !== "all-engines" &&
        vehicle.engineSize !== filters.engine
      ) {
        return false;
      }
      if (
        filters.transmission &&
        filters.transmission !== "all-transmissions" &&
        vehicle.transmission !== filters.transmission
      ) {
        return false;
      }
      if (
        filters.fuel &&
        filters.fuel !== "all-fuels" &&
        vehicle.fuelType !== filters.fuel
      ) {
        return false;
      }
      const vehiclePrice = parseFloat(vehicle.price);
      if (
        vehiclePrice < filters.priceRange[0] ||
        vehiclePrice > filters.priceRange[1]
      ) {
        return false;
      }
      if (
        vehicle.year < filters.yearRange[0] ||
        vehicle.year > filters.yearRange[1]
      ) {
        return false;
      }
      if (vehicle.mileage && vehicle.mileage > filters.odometerRange[1]) {
        return false;
      }
      return true;
    });

    // Passo 3: Aplicar busca por texto (último passo)
    if (filters.searchText && filters.searchText.trim()) {
      const searchTerm = filters.searchText.toLowerCase().trim();
      results = results.filter((vehicle) => {
        const searchableText = [
          vehicle.model,
          vehicle.vehicleBrand,
          vehicle.vehicleType,
          vehicle.fuelType,
          vehicle.transmission,
          vehicle.description,
        ]
          .join(" ")
          .toLowerCase();
        return searchableText.includes(searchTerm);
      });
    }

    return results;
  }, [data, filters]);

  // Componente de card padrão (caso não seja fornecido um personalizado)
  const DefaultVehicleCard = ({ vehicle }) => (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Imagem */}
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img
          src={
            vehicle.images?.[0] ||
            `https://via.placeholder.com/400x240/e2e8f0/64748b?text=${vehicle.vehicleBrand}+${vehicle.model}`
          }
          alt={`${vehicle.vehicleBrand} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {vehicle.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="text-yellow-600 text-md bg-gray-200 hover:bg-gray-300">
              <Star className="text-yellow-600 mr-4 fill-current" size={16} />
              Destaque
            </Badge>
          </div>
        )}
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

        <Button className="w-full py-6 text-md" size="sm">
          Ver Detalhes
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/*Backdrop overlay para mobile*/}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Botão menu hamburguer mobile */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="sticky mt2left-4 z-40 lg:hidden bg-white rounded-md p-2 border"
        >
          <ListFilter className="h-5 w-5 text-gray-600" />
        </button>
      )}
      <div className={cn("flex py-4 gap-6", className)}>
        {/* Sidebar com filtros */}
        <div
          className={cn(
            //Desktop Sidebar
            "hidden lg:block lg:w-[25%] lg:max-w-[320px] lg:min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-sm lg:sticky lg:top-4 h-fit",
            //Mobile overlay aberto
            isMobileMenuOpen &&
              "fixed top-0 left-0 right-0 bottom-0 z-50 block bg-white overflow-y-auto",
            className
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div
              className={cn(
                "flex items-center mb-3 justify-between"
                // mobile aberto, centralizar rótulo
              )}
            >
              <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
              {/* Fechar menu mobile */}
              {isMobileMenuOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-8 w-8 p-9 z-40 lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {/* Botões quando o menu mobile está fechado */}
              {!isMobileMenuOpen && (
                <div className="flex items-center gap-2">
                  {/* botão limpar fica oculto no mobile */}
                  {activeFilters.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-8 px-2 hidden lg:flex"
                    >
                      <X className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Limpar</span>
                    </Button>
                  )}
                </div>
              )}
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {activeFilters.map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                    onClick={() => removeFilter(filter.type)}
                  >
                    {filter.label}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, marca ou modelo..."
                value={filters.searchText}
                onChange={(e) => updateFilters({ searchText: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {filters.searchText && (
                <button
                  onClick={() => updateFilters({ searchText: "" })}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[calc(100vh-280px)] overflow-auto">
            <Accordion
              type="multiple"
              defaultValue={["category"]}
              className="p-4"
            >
              {/* Categoria */}
              <AccordionItem value="category">
                <AccordionTrigger
                  className={cn(
                    "text-base font-medium",
                    hasActiveFilter("category") && "text-blue-600 font-semibold"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Car
                      className={cn(
                        "h-4 w-4",
                        hasActiveFilter("category") && "text-blue-600"
                      )}
                    />
                    <span>Categoria</span>
                    {hasActiveFilter("category") && (
                      <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1">
                    {filterConfig.categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.category === category
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        {category === filterConfig.categories[0]
                          ? "Todos"
                          : category.charAt(0).toUpperCase() +
                            category.slice(1)}
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Tipo de Veículo */}
              {availableVehicleTypes.length > 0 && (
                <AccordionItem value="vehicle-type">
                  <AccordionTrigger
                    className={cn(
                      "text-base font-medium",
                      hasActiveFilter("vehicle-type") &&
                        "text-blue-600 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <CarFront
                        className={cn(
                          "h-4 w-4",
                          hasActiveFilter("vehicle-type") && "text-blue-600"
                        )}
                      />
                      <span>Tipo</span>
                      {hasActiveFilter("vehicle-type") && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          updateFilters({ vehicleType: "all-types" })
                        }
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.vehicleType === "all-types"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        Todos os tipos
                      </button>
                      {availableVehicleTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateFilters({ vehicleType: type })}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            filters.vehicleType === type
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "hover:bg-gray-100"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Preço */}
              <AccordionItem value="price-range">
                <AccordionTrigger
                  className={cn(
                    "text-base font-medium",
                    hasActiveFilter("price-range") &&
                      "text-blue-600 font-semibold"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <DollarSign
                      className={cn(
                        "h-4 w-4",
                        hasActiveFilter("price-range") && "text-blue-600"
                      )}
                    />
                    <span>Preço</span>
                    {hasActiveFilter("price-range") && (
                      <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      Até R$ {filters.priceRange[1].toLocaleString()}
                    </div>
                    <Slider
                      value={[filters.priceRange[1]]}
                      onValueChange={(value) =>
                        updateFilters({
                          priceRange: [filterConfig.priceRange.min, value[0]],
                        })
                      }
                      min={filterConfig.priceRange.min}
                      max={filterConfig.priceRange.max}
                      step={filterConfig.priceRange.step}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        R$ {filterConfig.priceRange.min.toLocaleString()}
                      </span>
                      <span>
                        R$ {filterConfig.priceRange.max.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Ano */}
              <AccordionItem value="year-range">
                <AccordionTrigger
                  className={cn(
                    "text-base font-medium",
                    hasActiveFilter("year-range") &&
                      "text-blue-600 font-semibold"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Calendar
                      className={cn(
                        "h-4 w-4",
                        hasActiveFilter("year-range") && "text-blue-600"
                      )}
                    />
                    <span>Ano</span>
                    {hasActiveFilter("year-range") && (
                      <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      {filters.yearRange[0]} - {filters.yearRange[1]}
                    </div>
                    <Slider
                      value={filters.yearRange}
                      onValueChange={(value) =>
                        updateFilters({ yearRange: value })
                      }
                      min={filterConfig.yearRange.min}
                      max={filterConfig.yearRange.max}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{filterConfig.yearRange.min}</span>
                      <span>{filterConfig.yearRange.max}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Quilometragem */}
              <AccordionItem value="odometer-range">
                <AccordionTrigger
                  className={cn(
                    "text-base font-medium",
                    hasActiveFilter("odometer-range") &&
                      "text-blue-600 font-semibold"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MapPin
                      className={cn(
                        "h-4 w-4",
                        hasActiveFilter("odometer-range") && "text-blue-600"
                      )}
                    />
                    <span>Quilometragem</span>
                    {hasActiveFilter("odometer-range") && (
                      <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      Até {filters.odometerRange[1].toLocaleString()} km
                    </div>
                    <Slider
                      value={[filters.odometerRange[1]]}
                      onValueChange={(value) =>
                        updateFilters({ odometerRange: [0, value[0]] })
                      }
                      min={0}
                      max={250000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0 km</span>
                      <span>250.000 km</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Marca */}
              {availableBrands.length > 0 && (
                <AccordionItem value="brand">
                  <AccordionTrigger
                    className={cn(
                      "text-base font-medium",
                      hasActiveFilter("brand") && "text-blue-600 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Tag
                        className={cn(
                          "h-4 w-4",
                          hasActiveFilter("brand") && "text-blue-600"
                        )}
                      />
                      <span>Marca</span>
                      {hasActiveFilter("brand") && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      <button
                        onClick={() =>
                          updateFilters({
                            brand: "all-brands",
                            model: "all-models",
                          })
                        }
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.brand === "all-brands"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        Todas as marcas
                      </button>
                      {availableBrands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() =>
                            updateFilters({ brand, model: "all-models" })
                          }
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            filters.brand === brand
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "hover:bg-gray-100"
                          )}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Modelo */}
              {availableModels.length > 0 && (
                <AccordionItem value="model">
                  <AccordionTrigger
                    className={cn(
                      "text-base font-medium",
                      hasActiveFilter("model") && "text-blue-600 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Package
                        className={cn(
                          "h-4 w-4",
                          hasActiveFilter("model") && "text-blue-600"
                        )}
                      />
                      <span>Modelo</span>
                      {hasActiveFilter("model") && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      <button
                        onClick={() => updateFilters({ model: "all-models" })}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.model === "all-models"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        Todos os modelos
                      </button>
                      {availableModels.map((model) => (
                        <button
                          key={model}
                          onClick={() => updateFilters({ model })}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            filters.model === model
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "hover:bg-gray-100"
                          )}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Motorização */}
              {availableEngines.length > 0 && (
                <AccordionItem value="engine">
                  <AccordionTrigger
                    className={cn(
                      "text-base font-medium",
                      hasActiveFilter("engine") && "text-blue-600 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MotorizationEngine
                        className={cn(
                          "h-4 w-4",
                          hasActiveFilter("engine") && "text-blue-600"
                        )}
                      />
                      <span>Motorização</span>
                      {hasActiveFilter("engine") && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      <button
                        onClick={() => updateFilters({ engine: "all-engines" })}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.engine === "all-engines"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        Todas as motorizações
                      </button>
                      {availableEngines.map((engine) => (
                        <button
                          key={engine}
                          onClick={() => updateFilters({ engine })}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            filters.engine === engine
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "hover:bg-gray-100"
                          )}
                        >
                          {engine}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Câmbio */}
              {availableTransmissions.length > 0 && (
                <AccordionItem value="transmission">
                  <AccordionTrigger
                    className={cn(
                      "text-base font-medium",
                      hasActiveFilter("transmission") &&
                        "text-blue-600 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <ManualTransmissions
                        className={cn(
                          "h-4 w-4",
                          hasActiveFilter("transmission") && "text-blue-600"
                        )}
                      />
                      <span>Câmbio</span>
                      {hasActiveFilter("transmission") && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          updateFilters({ transmission: "all-transmissions" })
                        }
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.transmission === "all-transmissions"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        Todos os câmbios
                      </button>
                      {availableTransmissions.map((transmission) => (
                        <button
                          key={transmission}
                          onClick={() => updateFilters({ transmission })}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            filters.transmission === transmission
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "hover:bg-gray-100"
                          )}
                        >
                          {transmission}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Combustível */}
              {availableFuels.length > 0 && (
                <AccordionItem value="fuel">
                  <AccordionTrigger
                    className={cn(
                      "text-base font-medium",
                      hasActiveFilter("fuel") && "text-blue-600 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Fuel
                        className={cn(
                          "h-4 w-4",
                          hasActiveFilter("fuel") && "text-blue-600"
                        )}
                      />
                      <span>Combustível</span>
                      {hasActiveFilter("fuel") && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full ml-auto"></div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      <button
                        onClick={() => updateFilters({ fuel: "all-fuels" })}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          filters.fuel === "all-fuels"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        Todos os combustíveis
                      </button>
                      {availableFuels.map((fuel) => (
                        <button
                          key={fuel}
                          onClick={() => updateFilters({ fuel })}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            filters.fuel === fuel
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "hover:bg-gray-100"
                          )}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>

        {/* Grid de veículos */}
        <div className="flex-1 ml-4 mr-4">
          {/* Header da seção */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Veículos Disponíveis
            </h2>
            <p className="text-sm text-gray-600">
              {filteredVehicles.length} veículo
              {filteredVehicles.length !== 1 ? "s" : ""} encontrado
              {filteredVehicles.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid de cards */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) =>
                CardComponent ? (
                  <CardComponent key={vehicle.id} vehicle={vehicle} />
                ) : (
                  <DefaultVehicleCard key={vehicle.id} vehicle={vehicle} />
                )
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum veículo encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros para encontrar mais opções
              </p>
            </div>
          )}
          {activeFilters.length > 0 && (
            <div className="min-w-full mt-8">
              <Button
                variant="ghost"
                className="min-w-full py-4 text-lg"
                onClick={clearAllFilters}
              >
                Ou talvez voce queira ver todos os veículos...
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleFilter;
