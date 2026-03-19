"use client";

import { useEffect, useState } from "react";
import { useVehicleSearch } from "@/hooks/useVehiclesSearch";
import { useSearchParams } from "next/navigation";
import VehicleFilter from "./VehicleFilter";
import VehicleCard from "@/components/VehicleCard";

export const VehiclesList = ({ userId = null }) => {
  const searchParams = useSearchParams();

  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearFilters,
    filteredVehicles,
    loadingVehicles,
    setIsImageSearch,
  } = useVehicleSearch();

  return (
    <div>
      <VehicleFilter CardComponent={VehicleCard} data={filteredVehicles} userId={userId} />
    </div>
  );
};
