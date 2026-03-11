"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const { userId } = await auth();
    console.log(`[checkUser] Iniciando checagem para o userId: ${userId || "não autenticado"}`);

    if (!userId) return null;

    // Second attempt: Only if user is new, request his data from Clerk API
    let user;
    try {
      user = await currentUser();
      // console.log(`[checkUser] Perfil Clerk recuperado para ${user?.id}`);
    } catch (apiErr) {
      console.error("[checkUser] Erro fatal na API do Clerk (currentUser):", apiErr.message);
      return null;
    }

    if (!user) {
      console.warn("[checkUser] userId existe mas currentUser retornou null. Sessão pode estar expidada ou parcial.");
      return null;
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;
    const userName = `${user.firstName || user.unsafeMetadata?.firstName || ""} ${user.lastName || user.unsafeMetadata?.lastName || ""}`.trim() || userEmail?.split("@")[0] || "Usuário";

    // Usando upsert para evitar erros de duplicidade em requisições paralelas e garantir atualização de dados (como imagem)
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

    console.log(`[checkUser] Sincronização concluída para: ${dbUser.email} (Role: ${dbUser.role})`);
    return dbUser;
  } catch (error) {
    console.error("[checkUser] Erro crítico de sincronização:", error.message);
    if (error.code === 'P2002') {
      console.error("[checkUser] Erro de unicidade no Prisma. Verifique se o e-mail ou clerkUserId já existe em outro registro.");
    }
    return null;
  }
};
