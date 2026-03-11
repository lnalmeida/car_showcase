"use server";

import { db as prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Esta action restaura as configurações básicas da concessionária 
 * e promove o usuário logado a ADMIN.
 */
export async function runRecovery() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return { success: false, error: "Você precisa estar logado para rodar a recuperação." };
        }

        // 1. Criar DealershipInfo se não existir
        let dealership = await prisma.dealershipInfo.findFirst();
        if (!dealership) {
            dealership = await prisma.dealershipInfo.create({
                data: {
                    name: "JF Veículos",
                    address: "Av. Leonel de Moura Brizola, nº 1990, Pilar, Duque de Caxias, RJ",
                    phone: "+55 21 98217-4174",
                    email: "contato@jfveiculospillar.com.br",
                    workingHourId: "default", // Valor temporário
                }
            });
            console.log("DealershipInfo criada.");
        }

        // 2. Garantir que o usuário atual existe no banco e é ADMIN
        const dbUser = await prisma.user.upsert({
            where: { clerkUserId: userId },
            update: { role: "ADMIN" },
            create: {
                clerkUserId: userId,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                role: "ADMIN"
            }
        });

        revalidatePath("/");
        revalidatePath("/admin");

        return {
            success: true,
            message: "Recuperação concluída! Você agora é ADMIN e as configurações básicas foram restauradas. Por favor, recarregue a página."
        };
    } catch (error) {
        console.error("Erro na recuperação:", error);
        return { success: false, error: error.message };
    }
}
