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
    const { search, page = 0, limit = 10, filter, sortBy, order } = params;

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

    console.log(
      "veículos relacionados: \n" +
        JSON.stringify(serializedRelatedVehicles, null, 2)
    );
    return { success: true, data: serializedRelatedVehicles };
  } catch (error) {
    console.error("Erro ao buscar veículos relacionados:", error.message);
    return { success: false, message: "Erro ao buscar veículos relacionados" };
  }
};
