"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const VehiclesList = () => {
  const [search, setSearch] = React.useState("");

  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // API call
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
    </div>
  );
};

export default VehiclesList;
