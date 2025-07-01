import React from "react";

import { Car } from "lucide-react";

export const dynamic = "force-dynamic";

import VehiclesList from "./_components/VehiclesList";

export const Metadata = {
  title: "Veículos | Administração",
  description: "Administre os veículos da sua loja",
};
const AdminVehiclesPage = () => {
  return (
    <div className="p-6">
      <div className="flex py-2 space-x-4 items-center">
        <Car className="h-8 w-8 mb-6" />
        <h1 className="text-2xl font-bold mb-6">Administrarção de Veículos</h1>
      </div>
      <VehiclesList />
    </div>
  );
};

export default AdminVehiclesPage;
