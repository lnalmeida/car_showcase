import React from "react";

const CarPage = async ({ params }) => {
  const { id } = await params;
  return <div>Carro id: {id}</div>;
};

export default CarPage;
