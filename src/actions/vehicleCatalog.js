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
    console.log("Serialized vehicles data:", result);
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

    console.log("Serialized vehicles data:", result);

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
