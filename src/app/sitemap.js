import { db } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://car-showcase-peach-xi.vercel.app";

export default async function sitemap() {
  // Páginas estáticas
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/vehicles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Páginas dinâmicas — todos os veículos disponíveis
  let vehiclePages = [];
  try {
    const vehicles = await db.vehicle.findMany({
      where: { status: { not: "Vendido" } },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    vehiclePages = vehicles.map((vehicle) => ({
      url: `${BASE_URL}/vehicles/${vehicle.id}`,
      lastModified: vehicle.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Erro ao gerar sitemap de veículos:", error);
  }

  return [...staticPages, ...vehiclePages];
}
