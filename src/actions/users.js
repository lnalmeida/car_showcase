"use server";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const getUsersData = async (params = {}) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");
    if (user.role !== "ADMIN") throw new Error("Unauthorized");

    const { search, page = 0, limit = 10, filter, sortBy, order } = params;

    let where = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        // {
        //   role: {
        //     contains: search,
        //     mode: "insensitive",
        //   },
        // },
      ];
    }

    const [users, totalCount] = await Promise.all([
      db.user.findMany({
        where,
        orderBy: { role: "asc" },
        skip: page * limit,
        take: limit,
      }),
      db.user.count({
        where,
      }),
    ]);

    console.log(users);
    return { success: true, data: users, totalCount };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error.message);
    return { sucess: false };
  }
};
