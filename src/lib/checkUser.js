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

    // Busca usuário existente para evitar conflitos de email únicos se clerkUserId for novo mas email já existir
    const existingByEmail = userEmail ? await db.user.findUnique({ where: { email: userEmail } }) : null;

    const dbUser = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {
        name: userName,
        imageUrl: user.imageUrl,
        email: userEmail || undefined, // Não atualiza se for nulo para evitar quebra de constraint se já houver outro nulo
        phone: user.unsafeMetadata?.phone || null,
      },
      create: {
        clerkUserId: userId,
        name: userName,
        imageUrl: user.imageUrl,
        email: userEmail || `user_${userId}@placeholder.com`, // Fallback se Clerk não prover email
        phone: user.unsafeMetadata?.phone || null,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Erro em checkUser:", error);
    return null;
  }
};
