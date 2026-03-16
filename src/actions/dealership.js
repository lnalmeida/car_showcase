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

export const getDealershipInfo = unstable_cache(
  async () => {
    try {
      const dealership = await prisma.dealershipInfo.findFirst();
      return { success: true, data: dealership };
    } catch (error) {
      console.error("Erro ao buscar informações da loja:", error);
      return { success: false, error: "Falha ao buscar informações da loja." };
    }
  },
  ["dealership-info"],
  { revalidate: 3600, tags: ["dealership"] }
);

export async function upsertDealershipInfo(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
        if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

        let logoUrl = data.logoUrl;
        if (data.imageBase64) {
            const uploadResult = await cloudinary.uploader.upload(data.imageBase64, {
                folder: `settings/dealership`,
            });
            logoUrl = uploadResult.secure_url;
        }

        // Buscando se já existe para fazer update ou create
        const existing = await prisma.dealershipInfo.findFirst();

        // Preparando o payload com IDs obrigatórios pra update
        const payload = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            website: data.website || null,
            socialMedia: data.socialMedia || null,
            facebookUrl: data.facebookUrl || null,
            instagramUrl: data.instagramUrl || null,
            tiktokUrl: data.tiktokUrl || null,
            description: data.description,
            logoUrl: logoUrl,
        };

        let result;
        if (existing) {
            result = await prisma.dealershipInfo.update({
                where: { id: existing.id },
                data: payload
            });
        } else {
            // Mock de workingHourId apenas para não quebrar o relation field na criação
            result = await prisma.dealershipInfo.create({
                data: {
                    ...payload,
                    workingHourId: "default",
                }
            });
        }

        revalidatePath("/admin/settings");
        revalidatePath("/");
        revalidateTag("dealership");
        
        return { success: true, data: result };
    } catch (error) {
        console.error("Erro ao salvar informações da loja:", error);
        return { success: false, error: error.message || "Falha ao salvar as informações da loja." };
    }
}
