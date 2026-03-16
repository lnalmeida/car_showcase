import { deepSerialize } from "./utils";

export const serializeVehicleData = async (vehicle, wishListed = false) => {
  if (!vehicle) return null;

  const data = {
    ...vehicle,
    category: vehicle.category?.name || vehicle.category || "N/A",
    categoryId: vehicle.categoryId || null,
    vehicleBrand: vehicle.brand?.name || vehicle.vehicleBrand || "N/A",
    brandId: vehicle.brandId || null,
    vehicleType: vehicle.type?.name || vehicle.vehicleType || "N/A",
    typeId: vehicle.typeId || null,
    price: vehicle.price ? Number(vehicle.price).toFixed(2) : 0,
    createdAt: vehicle.createdAt,
    updatedAt: vehicle.updatedAt,
    wishListed: wishListed,
  };

  return deepSerialize(data);
};

// Helper para gerar o range de páginas com elipses
export const getPaginationRange = (
  totalPages,
  currentPage,
  siblingCount = 1
) => {
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }
};
