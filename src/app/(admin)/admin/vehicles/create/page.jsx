import React from "react";
import AddVehicleForm from "../_components/AddVehicleForm";

export const metadata = {
  title: "Adicionar um novo veículo | Administração",
  description: "Adicionar um novo veículo na sua loja",
};

const AddVehiclePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Adicionar um novo veículo</h1>
      <AddVehicleForm />
    </div>
  );
};

export default AddVehiclePage;
