// app/cars/page.js
// Esta página é um Server Component e não precisa de "use client";

import React from 'react';
import { getSearchedVehicles } from '@/actions/home'; // Sua Server Action para buscar veículos públicos
import CarList, {VehiclesList} from './_components/VehiclesList'; // O Client Component que usará TanStack Query

export default async function CarsPage({ searchParams }) {
  // 1. Parseia os parâmetros de busca da URL
  const { search, brand, category, type, color } = await searchParams;

  // 2. Prepara o objeto de filtro para a Server Action
  // Não incluímos aqui o `sortBy` ou `order` se não vierem da HomeSearch
  const filters = {
    search: search || '', // Garante que é uma string, mesmo se undefined
    brand: brand || '',
    category: category || '',
    type: type || '',
    color: color || ''
  };

  // 3. Renderiza o Client Component, passando os filtros como props
  // O CarList será responsável por usar TanStack Query para a busca
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Resultados da Busca</h1>
      <VehiclesList />
    </div>
  );
};