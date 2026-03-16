"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getBrands = async (categoryId) => {
  const getBrandsCached = unstable_cache(
    async (catId) => {
      const whereClause = catId ? { categoryId: catId } : {};
      return await prisma.brand.findMany({
        where: whereClause,
        include: { category: true },
        orderBy: { name: "asc" },
      });
    },
    ["brands-list"],
    { revalidate: 3600, tags: ["brands"] }
  );

  try {
    const brands = await getBrandsCached(categoryId);
    return { success: true, data: brands };
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return { success: false, error: "Falha ao buscar marcas." };
  }
};

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
        revalidateTag("brands");
        return { success: true, data: brand };
    } catch (error) {
        console.error("Erro ao criar marca");
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
        revalidateTag("brands");
        return { success: true, data: brand };
    } catch (error) {
        console.error("Erro ao atualizar marca");
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
        revalidateTag("brands");
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar marca");
        return { success: false, error: "Falha ao deletar marca." };
    }
}
