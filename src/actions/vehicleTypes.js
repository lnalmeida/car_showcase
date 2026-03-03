"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function getVehicleTypes(categoryId) {
    try {
        const whereClause = categoryId ? { categoryId } : {};
        const types = await prisma.vehicleType.findMany({
            where: whereClause,
            include: { category: true },
            orderBy: { name: "asc" },
        });
        return { success: true, data: types };
    } catch (error) {
        console.error("Error fetching vehicle types:", error);
        return { success: false, error: "Falha ao buscar tipos de veículos." };
    }
}

export async function createVehicleType(data) {
    try {
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
        return { success: true, data: type };
    } catch (error) {
        console.error("Error creating vehicle type:", error);
        return { success: false, error: "Falha ao criar tipo de veículo." };
    }
}

export async function updateVehicleType(id, data) {
    try {
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
        return { success: true, data: type };
    } catch (error) {
        console.error("Error updating vehicle type:", error);
        return { success: false, error: "Falha ao atualizar tipo de veículo." };
    }
}

export async function deleteVehicleType(id) {
    try {
        await prisma.vehicleType.delete({
            where: { id },
        });
        revalidatePath("/admin/settings/vehicle-types");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error deleting vehicle type:", error);
        return { success: false, error: "Falha ao deletar tipo de veículo." };
    }
}
