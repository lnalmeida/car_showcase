"use server";

import { db as prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Falha ao buscar categorias." };
  }
}

export async function createCategory(data) {
  try {
    let imageUrl = data.imageUrl;
    if (data.imageBase64) {
      const uploadResult = await cloudinary.uploader.upload(data.imageBase64, {
        folder: `settings/categories`,
      });
      imageUrl = uploadResult.secure_url;
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        imageUrl,
      },
    });
    revalidatePath("/admin/settings/categories");
    revalidatePath("/");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Falha ao criar categoria." };
  }
}

export async function updateCategory(id, data) {
  try {
    let imageUrl = data.imageUrl;
    if (data.imageBase64) {
      const uploadResult = await cloudinary.uploader.upload(data.imageBase64, {
        folder: `settings/categories`,
      });
      imageUrl = uploadResult.secure_url;
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        imageUrl,
      },
    });
    revalidatePath("/admin/settings/categories");
    revalidatePath("/");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Falha ao atualizar categoria." };
  }
}

export async function deleteCategory(id) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/settings/categories");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Falha ao deletar categoria." };
  }
}
