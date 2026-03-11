"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

const getAdmin = async () => {
  // Ensure the user is synced to our DB before checking roles
  const user = await checkUser();

  if (!user) {
    return {
      authorized: false,
      reason: "no-user",
    };
  }

  if (!user || user.role !== "ADMIN") {
    console.warn(`[getAdmin] Acesso negado para ${user?.email}. Role: ${user?.role}`);
    return {
      authorized: false,
      reason: "not-admin",
    };
  }

  console.log(`[getAdmin] Acesso concedido para ADMIN: ${user.email}`);

  return {
    authorized: true,
    user,
  };
};

export { getAdmin };
