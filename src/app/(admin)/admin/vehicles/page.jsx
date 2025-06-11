import React from "react";

import VehiclesList from "./_components/VehiclesList";

export const Metadata = {
  title: "Veículos | Administração",
  description: "Administre os veículos da sua loja",
};
const AdminVehiclesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Administrarção de Veículos</h1>
      <VehiclesList />
    </div>
  );
};

export default AdminVehiclesPage;
