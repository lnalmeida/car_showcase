"use server";

import {NextResponse} from "next/server";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {db} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const getUsersData = async (params = {}) => {
    try {
        const {userId} = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });

        if (!user) throw new Error("User not found");
        if (user.role !== "ADMIN") throw new Error("Unauthorized");

        const {search, page = 0, limit = 10, filter, sortBy, order} = params;

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
            ];
        }

        const [users, totalCount] = await Promise.all([
            db.user.findMany({
                where,
                orderBy: {role: "asc"},
                skip: page * limit,
                take: limit,
            }),
            db.user.count({
                where,
            }),
        ]);

        console.log(users);
        return {success: true, data: users, totalCount};
    } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
        return {sucess: false};
    }
};

export const updateUserRole = async ({id, role}) => {
    console.log("Chama a função updateUserRole no backend");
    try {
        const {userId} = await auth();
        if (!userId) return {success: false, error: "Unauthorized"};

        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });

        if (!user) return {success: false, error: "User not found."};
        if (user.role !== "ADMIN") return {success: false, error: "Unathorized"};

        const userToUpdate = await db.user.findUnique({where: {id}});

        if (!userToUpdate)
            return {success: false, error: "Usuário não encontrado."};

        if (userToUpdate.role === role) {
            return {success: true, message: "Nenhuma informação foi alterada."};
        }

        const updatedUser = await db.user.update({
            where: {id},
            data: {
                role: role,
            },
        });

        revalidatePath("/admin/users");
        return {success: true, data: updatedUser};
    } catch (error) {
        console.error("❌ Erro ao atualizar usuário:", error.message);
        return {success: false, error: error.message};
    }
};

export const removeUser = async (id) => {
    console.log("clerkClient.users", clerkClient.users);

    try {
        const {userId} = await auth();
        if (!userId) return {success: false, error: "Unauthorized"};

        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });

        if (!user) return {success: false, error: "User not found"};

        if (user.role !== "ADMIN") return {success: false, error: "Unauthorized"};

        const userToDelete = await db.user.findUnique({
            where: {id},
        });

        if (!userToDelete) {
            return {
                success: false,
                error: "Usuário não encontrado.",
            };
        }

        if (user.clerkUserId === userToDelete.clerkUserId) {
            return {success: false, error: "Você não pode excluir a si mesmo."};
        }


        await db.user.delete({
            where: {id},
        });

        revalidatePath("/admin/users");

        try {
            const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY; // Certifique-se que esta variável está definida
            if (!CLERK_SECRET_KEY) {
                return {success: false, error: "CLERK_SECRET_KEY not set in environment variables."};
            }

            const response = await fetch(
                `https://api.clerk.com/v1/users/${userToDelete.clerkUserId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                return {success: false, error: errorData};
            }
            console.log(`Usuário ${userToDelete.clerkUserId} deletado no Clerk.`);
        } catch (clerkError) {
            console.error("❌ Erro ao deletar usuário no Clerk:", clerkError.message);
            return {
                success: false,
                error: `Usuário deletado do DB, mas erro ao deletar no Clerk: ${clerkError.message}`,
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error("❌ Erro ao deletar usuário:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
