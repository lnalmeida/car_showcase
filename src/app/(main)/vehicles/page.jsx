// app/vehicles/page.js
// Esta página é um Server Component e não precisa de "use client";

import React from "react";
import { getSearchedVehicles } from "@/actions/home"; // Sua Server Action para buscar veículos públicos
import CarList, { VehiclesList } from "./_components/VehiclesList"; // O Client Component que usará TanStack Query

export default async function CarsPage({ searchParams }) {
  // 1. Parseia os parâmetros de busca da URL
  const params = await searchParams;
  const { search, brand, category, type, color, fromImage, ...restParams } = params;

  // 2. Prepara o objeto de filtro para a Server Action
  const filters = {
    search: search || "",
    brand: brand || "",
    category: category || "",
    type: type || "",
  };

  const hasFilters = Boolean(search || brand || category || type || color || fromImage || Object.keys(restParams).length > 0);

  // 3. Renderiza o Client Component, passando os filtros como props
  return (
    <>
      <section className="relative py-4 md:py-7 dotted-background">
        <div className="px-12 py-8">
          <h1 className="text-5xl text-white font-bold text-center mb-2">
            {hasFilters ? "Resultados da Busca" : "Conheça nosso estoque"}
          </h1>
        </div>
      </section>
      <section>
        <VehiclesList filters={filters} />
      </section>
    </>
  );
}
