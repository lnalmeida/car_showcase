"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

const getAdmin = async () => {
  const user = await checkUser();

  if (!user) {
    return {
      authorized: false,
      reason: "no-user",
    };
  }

  if (!user || user.role !== "ADMIN") {
    return {
      authorized: false,
      reason: "not-admin",
    };
  }

  return {
    authorized: true,
    user,
  };
};

export { getAdmin };
