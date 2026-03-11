"use server";

import { db } from "@/lib/prisma";

/**
 * Checks if a user is registered in the application database by their email.
 * @param {string} email 
 * @returns {Promise<boolean>}
 */
export async function isUserRegistered(email) {
    if (!email) return false;

    try {
        const user = await db.user.findUnique({
            where: { email: email.toLowerCase() },
            select: { id: true }
        });

        return !!user;
    } catch (error) {
        console.error("Erro ao verificar registro de usuário");
        return false;
    }
}
