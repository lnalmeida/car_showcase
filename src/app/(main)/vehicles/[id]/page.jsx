import VehicleDetail from "@/components/VehicleDetail";
import React from "react";

const VehicleDetailPage = async ({ params }) => {
  const { id } = await params;
  return <VehicleDetail id={id} />;
};

export default VehicleDetailPage;
