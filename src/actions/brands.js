"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function getBrands(categoryId) {
    try {
        const whereClause = categoryId ? { categoryId } : {};
        const brands = await prisma.brand.findMany({
            where: whereClause,
            include: { category: true },
            orderBy: { name: "asc" },
        });
        return { success: true, data: brands };
    } catch (error) {
        console.error("Error fetching brands:", error);
        return { success: false, error: "Falha ao buscar marcas." };
    }
}

export async function createBrand(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        let imageUrl = data.imageUrl;
        if (data.imageBase64) {
            const uploadResult = await cloudinary.uploader.upload(data.imageBase64, {
                folder: `settings/brands`,
            });
            imageUrl = uploadResult.secure_url;
        }

        const brand = await prisma.brand.create({
            data: {
                name: data.name,
                imageUrl,
                categoryId: data.categoryId,
            },
        });
        revalidatePath("/admin/settings/brands");
        revalidatePath("/");
        return { success: true, data: brand };
    } catch (error) {
        console.error("Error creating brand:", error);
        return { success: false, error: "Falha ao criar marca." };
    }
}

export async function updateBrand(id, data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        let imageUrl = data.imageUrl;
        if (data.imageBase64) {
            const uploadResult = await cloudinary.uploader.upload(data.imageBase64, {
                folder: `settings/brands`,
            });
            imageUrl = uploadResult.secure_url;
        }

        const brand = await prisma.brand.update({
            where: { id },
            data: {
                name: data.name,
                imageUrl,
                categoryId: data.categoryId,
            },
        });
        revalidatePath("/admin/settings/brands");
        revalidatePath("/");
        return { success: true, data: brand };
    } catch (error) {
        console.error("Error updating brand:", error);
        return { success: false, error: "Falha ao atualizar marca." };
    }
}

export async function deleteBrand(id) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        await prisma.brand.delete({
            where: { id },
        });
        revalidatePath("/admin/settings/brands");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error deleting brand:", error);
        return { success: false, error: "Falha ao deletar marca." };
    }
}
