"use server";
import { db } from "@/lib/prisma";
import { serializeVehicleData } from "@/lib/helpers";

export const getAllVehicles = async () => {
  try {
    const vehicles = await db.vehicle.findMany({
      orderBy: { createdAt: "desc" },
    });

    const result = await Promise.all(
      vehicles.map((v) => serializeVehicleData(v))
    );
    // console.log("Serialized vehicles data:", result);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("❌ Error getting vehicles:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getSearchedVehicles = async (params = {}) => {
  try {
    const { search, page = 0, limit = 10, filter, category, sortBy, order } = params;

    let where = {};

    if (filter) {
      where.category = {
        equals: filter,
        mode: "insensitive",
      };
    }

    if (category) {
      where.category = {
        equals: category,
        mode: "insensitive",
      };
    }

    if (search) {
      where.OR = [
        {
          category: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          vehicleType: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          vehicleBrand: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          status: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const orderByClause = sortBy ? { [sortBy]: order } : { createdAt: "desc" };

    const [vehicles, totalCount] = await Promise.all([
      db.vehicle.findMany({
        where,
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

    // console.log("Serialized vehicles data:", result);

    return {
      success: true,
      data: result,
      totalCount,
    };
  } catch (error) {
    console.error("❌ Error getting vehicles:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getRelatedVehicles = async (type) => {
  try {
    const relatedVehicles = await db.vehicle.findMany({
      where: {
        vehicleType: type,
        status: "Disponível",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!relatedVehicles.length) {
      return { success: false, message: "Não há veículos em destaque" };
    }

    const serializedRelatedVehicles = await Promise.all(
      relatedVehicles.map((rv) => serializeVehicleData(rv))
    );

    // console.log(
    //   "veículos relacionados: \n" +
    //     JSON.stringify(serializedRelatedVehicles, null, 2)
    // );
    return { success: true, data: serializedRelatedVehicles };
  } catch (error) {
    console.error("Erro ao buscar veículos relacionados:", error.message);
    return { success: false, message: "Erro ao buscar veículos relacionados" };
  }
};

export const saveUserVehicles = async (userId, vehicleId) => {
  if(!userId || !vehicleId) return {success: false};
  
  
  try {
    await  db.userSavedVehicle.create({
      data: {
        userId,
        vehicleId,
      }
    });

    console.log("SUCESSO: Veículo salvo no banco de dados.");
    return {success: true};

  } catch (error) {
    console.error("❌ Erro ao salvar veículo:", error.message);
    throw new Error(`Failed to save vehicle: ${error.message}.`);
  }

};

export const unsaveUserVehicles = async (userId, vehicleId) => {
  if(!userId || !vehicleId) return {success: false};
  console.log("userId: " + userId + " vehicleId: " + vehicleId);

  try {
    await  db.userSavedVehicle.delete({
      where: {
        userId_vehicleId: {
          userId,
          vehicleId,
        },
      },
    });

    console.log("SUCESSO: Veículo removido do banco de dados.");
    return {success: true};

  } catch (error) {
    console.error("❌ Erro ao remover veículo:", error.message);
    throw new Error(`Failed to remove vehicle: ${error.message}.`);
  }

};

export const getUserSavedVehicles = async (userId) => {
  if(!userId) return {success: false};

  try {
    const savedVehicles = await db.userSavedVehicle.findMany({
      where: {
        userId,
      },
      select: {
        vehicle: {
          id: true,
        },
      },
    });

    const serializedSavedVehicles = await Promise.all(
      savedVehicles.map((sv) => serializeVehicleData(sv.vehicle))
    );

    serializedSavedVehicles.forEach((v) => {
      v.wishListed = true;
    });

    console.log("SUCESSO: Veículos salvos do usuário recuperados.");
    return {success: true, data: serializedSavedVehicles};

  } catch (error) {
    console.error("❌ Erro ao recuperar veículos salvos do usuário:", error.message);
    throw new Error(`Failed to retrieve saved vehicles: ${error.message}.`);
  }

};