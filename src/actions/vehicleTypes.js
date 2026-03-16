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

export const getVehicleTypes = async (categoryId) => {
  const getVehicleTypesCached = unstable_cache(
    async (catId) => {
      const whereClause = catId ? { categoryId: catId } : {};
      return await prisma.vehicleType.findMany({
        where: whereClause,
        include: { category: true },
        orderBy: { name: "asc" },
      });
    },
    ["vehicle-types-list"],
    { revalidate: 3600, tags: ["vehicle-types"] }
  );

  try {
    const types = await getVehicleTypesCached(categoryId);
    return { success: true, data: types };
  } catch (error) {
    console.error("Erro ao buscar tipos de veículos:", error);
    return { success: false, error: "Falha ao buscar tipos de veículos." };
  }
};

export async function createVehicleType(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        let imageUrl = data.imageUrl;
        if (data.imageBase64) {
            const uploadResult = await cloudinary.uploader.upload(data.imageBase64, {
                folder: `settings/types`,
            });
            imageUrl = uploadResult.secure_url;
        }

        const type = await prisma.vehicleType.create({
            data: {
                name: data.name,
                imageUrl,
                categoryId: data.categoryId,
            },
        });
        revalidatePath("/admin/settings/vehicle-types");
        revalidatePath("/");
        revalidateTag("vehicle-types");
        return { success: true, data: type };
    } catch (error) {
        console.error("Erro ao criar tipo de veículo");
        return { success: false, error: "Falha ao criar tipo de veículo." };
    }
}

export async function updateVehicleType(id, data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        let imageUrl = data.imageUrl;
        if (data.imageBase64) {
            const uploadResult = await cloudinary.uploader.upload(data.imageBase64, {
                folder: `settings/types`,
            });
            imageUrl = uploadResult.secure_url;
        }

        const type = await prisma.vehicleType.update({
            where: { id },
            data: {
                name: data.name,
                imageUrl,
                categoryId: data.categoryId,
            },
        });
        revalidatePath("/admin/settings/vehicle-types");
        revalidatePath("/");
        revalidateTag("vehicle-types");
        return { success: true, data: type };
    } catch (error) {
        console.error("Erro ao atualizar tipo de veículo");
        return { success: false, error: "Falha ao atualizar tipo de veículo." };
    }
}

export async function deleteVehicleType(id) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        await prisma.vehicleType.delete({
            where: { id },
        });
        revalidatePath("/admin/settings/vehicle-types");
        revalidatePath("/");
        revalidateTag("vehicle-types");
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar tipo de veículo");
        return { success: false, error: "Falha ao deletar tipo de veículo." };
    }
}
