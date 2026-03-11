"use server";
import { db } from "@/lib/prisma";
import { serializeVehicleData } from "@/lib/helpers";

export const getAllVehicles = async () => {
  try {
    const vehicles = await db.vehicle.findMany({
      where: { status: { not: "Vendido" } },
      include: { category: true, brand: true, type: true, sale: true },
      orderBy: { createdAt: "desc" },
    });

    const result = await Promise.all(
      vehicles.map((v) => serializeVehicleData(v))
    );
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Erro ao buscar veículos");
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getSearchedVehicles = async (params = {}) => {
  try {
    const { search, page = 0, limit = 10, filter, category, sortBy, order } = params;

    let where = { status: { not: "Vendido" } };

    if (filter) {
      where.categoryId = filter;
    }

    if (category) {
      where.categoryId = category;
    }

    if (search) {
      where.OR = [
        {
          category: { name: { contains: search, mode: "insensitive" } },
        },
        {
          type: { name: { contains: search, mode: "insensitive" } },
        },
        {
          brand: { name: { contains: search, mode: "insensitive" } },
        },
        {
          status: { contains: search, mode: "insensitive" },
        },
        {
          model: { contains: search, mode: "insensitive" },
        },
      ];
    }

    const orderByClause = sortBy ? { [sortBy]: order } : { createdAt: "desc" };

    const [vehicles, totalCount] = await Promise.all([
      db.vehicle.findMany({
        where,
        include: { category: true, brand: true, type: true, sale: true },
        orderBy: orderByClause,
        skip: page * limit,
        take: limit,
      }),
      db.vehicle.count({
        where,
      }),
    ]);

    const result = await Promise.all(
      vehicles.map((v) => serializeVehicleData(v))
    );


    return {
      success: true,
      data: result,
      totalCount,
    };
  } catch (error) {
    console.error("Erro ao buscar veículos");
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getRelatedVehicles = async (typeId, currentVehicleId) => {
  try {
    const relatedVehicles = await db.vehicle.findMany({
      where: {
        typeId: typeId,
        id: currentVehicleId ? { not: currentVehicleId } : undefined,
        status: { not: "Vendido" },
      },
      include: { category: true, brand: true, type: true, sale: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!relatedVehicles.length) {
      return { success: true, data: [] };
    }

    const serializedRelatedVehicles = await Promise.all(
      relatedVehicles.map((rv) => serializeVehicleData(rv))
    );

    //   "veículos relacionados: \n" +
    //     JSON.stringify(serializedRelatedVehicles, null, 2)
    // );
    return { success: true, data: serializedRelatedVehicles };
  } catch (error) {
    console.error("Erro ao buscar veículos relacionados");
    return { success: false, message: "Erro ao buscar veículos relacionados" };
  }
};

export const saveUserVehicles = async (userId, vehicleId) => {
  if (!userId || !vehicleId) return { success: false };

  try {
    // Verificar se já existe para evitar duplicatas
    const existingRecord = await db.userSavedVehicle.findUnique({
      where: {
        userId_vehicleId: {
          userId,
          vehicleId,
        },
      },
    });

    if (existingRecord) {
      return { success: true, message: "Veículo já está nos favoritos" };
    }

    await db.userSavedVehicle.create({
      data: {
        userId,
        vehicleId,
      }
    });

    return { success: true };

  } catch (error) {
    console.error("Erro ao salvar veículo");
    return { success: false, error: error.message };
  }

};

export const unsaveUserVehicles = async (userId, vehicleId) => {
  if (!userId || !vehicleId) return { success: false };

  try {
    // Primeiro, verificar se o registro existe
    const existingRecord = await db.userSavedVehicle.findUnique({
      where: {
        userId_vehicleId: {
          userId,
          vehicleId,
        },
      },
    });

    if (!existingRecord) {
      return { success: false, error: "Veículo não está nos favoritos" };
    }


    await db.userSavedVehicle.delete({
      where: {
        userId_vehicleId: {
          userId,
          vehicleId,
        },
      },
    });

    return { success: true };

  } catch (error) {
    console.error("Erro ao remover veículo");
    return { success: false, error: error.message };
  }

};

export const getUserSavedVehicles = async (userId) => {
  if (!userId) return { success: false };

  try {
    const savedVehicles = await db.userSavedVehicle.findMany({
      where: {
        userId,
      },
      include: {
        vehicle: {
          include: { category: true, brand: true, type: true, sale: true }
        },
      },
    });

    const serializedSavedVehicles = await Promise.all(
      savedVehicles.map((sv) => serializeVehicleData(sv.vehicle, true))
    );

    return { success: true, data: serializedSavedVehicles };

  } catch (error) {
    console.error("Erro ao recuperar veículos salvos do usuário");
    throw new Error(`Failed to retrieve saved vehicles: ${error.message}.`);
  }

};

export const getSoldVehicles = async (params = {}) => {
  try {
    const { page = 0, limit = 10, sortBy = "createdAt", order = "desc" } = params;

    let where = { status: "Vendido" };
    const orderByClause = { [sortBy]: order };

    const [vehicles, totalCount] = await Promise.all([
      db.vehicle.findMany({
        where,
        include: { category: true, brand: true, type: true, sale: true },
        orderBy: orderByClause,
        skip: page * limit,
        take: limit,
      }),
      db.vehicle.count({
        where,
      }),
    ]);

    const result = await Promise.all(
      vehicles.map((v) => serializeVehicleData(v))
    );

    return {
      success: true,
      data: result,
      totalCount,
    };
  } catch (error) {
    console.error("Erro ao buscar veículos vendidos");
    return {
      success: false,
      error: error.message,
    };
  }
};