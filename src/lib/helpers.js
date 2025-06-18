export const serializeVehicleData = async (vehicle, wishListed = false) => {
  return {
    ...vehicle,
    price: vehicle.price ? parseFloat(vehicle.price.toString()) : 0,
    createdAt: vehicle.createdAt.toISOString(),
    updatedAt: vehicle.updatedAt.toISOString(),
    wishListed: wishListed,
  };
};
