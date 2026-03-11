"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    let user;
    try {
      user = await currentUser();
    } catch (apiErr) {
      return null;
    }

    if (!user) return null;

    const userEmail = user.emailAddresses[0]?.emailAddress;
    const userName = `${user.firstName || user.unsafeMetadata?.firstName || ""} ${user.lastName || user.unsafeMetadata?.lastName || ""}`.trim() || userEmail?.split("@")[0] || "Usuário";

    const dbUser = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {
        name: userName,
        imageUrl: user.imageUrl,
        email: userEmail,
        phone: user.unsafeMetadata?.phone || null,
      },
      create: {
        clerkUserId: userId,
        name: userName,
        imageUrl: user.imageUrl,
        email: userEmail,
        phone: user.unsafeMetadata?.phone || null,
      },
    });

    return dbUser;
  } catch (error) {
    return null;
  }
};
