import React from "react";
import EditVehicleForm from "../../_components/EditVehicleForm";

export const metadata = {
  title: "Editar veículo | Administração",
  description: "Editar informações do veículo",
};

const EditVehiclePage = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar veículo</h1>
      <EditVehicleForm vehicleId={id} />
    </div>
  );
};

export default EditVehiclePage;