"use server";

import { db } from "@/lib/prisma";
import { serializeVehicleData } from "@/lib/helpers";
import { unstable_cache } from "next/cache"; 
import { fileToBase64 } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

// Cache criado uma única vez no escopo de módulo (Fix #1)
const getFeaturedVehiclesCached = unstable_cache(
  async (limit) => {
    return await db.vehicle.findMany({
      where: {
        featured: true,
        status: { not: "Vendido" },
      },
      take: limit,
      include: {
        category: true,
        brand: true,
        type: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["featured-vehicles"],
  { revalidate: 3600, tags: ["vehicles", "featured"] }
);

// Busca os veículos em destaque
export const getFeaturedVehicles = async (limit = 3, userId = null) => {
  try {
    // Fix #6: paralelizar busca de featured e saved quando userId presente
    const [featuredVehicles, savedVehicles] = await Promise.all([
      getFeaturedVehiclesCached(limit),
      userId
        ? db.userSavedVehicle.findMany({ where: { userId }, select: { vehicleId: true } }).catch(() => [])
        : Promise.resolve([]),
    ]);

    if (!featuredVehicles || !featuredVehicles.length) {
      return { success: false, message: "Não há veículos em destaque" };
    }

    const savedVehicleIds = new Set(savedVehicles.map((sv) => sv.vehicleId));

    const serializedFeaturedVehicles = await Promise.all(
      featuredVehicles.map((fv) => serializeVehicleData(fv, savedVehicleIds.has(fv.id)))
    );

    return { success: true, data: serializedFeaturedVehicles };
  } catch (error) {
    console.error("Erro ao buscar veículos em destaque:", error);
    return { success: false, message: "Erro ao buscar veículos em destaque" };
  }
};

export const processImageSearch = async (file) => {
  try {
    // rate limit check com arcjet
    if (aj) {
      try {
        const req = await request();
        const decision = await aj.protect(req, {
          requested: 1,
        });

        if (decision.isDenied()) {
          if (decision.reason.isRateLimit()) {
            console.error("Rate limit excedido");
            return {
              success: false,
              message: "Limite de requisições excedido. Tente novamente mais tarde.",
            };
          }
          console.error("Requisição negada");
          return {
            success: false,
            message: "Requisição negada. Tente novamente mais tarde.",
          };
        }
      } catch (arcjetError) {
        console.warn("Arcjet rate limit check failed, proceeding:", arcjetError.message);
      }
    }

    // Processamento da imagem

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const base64Image = await fileToBase64(file);

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };

    const prompt = `
        Analise esta imagem de veículo e extraia as seguintes informações:
        1.  Categoria (Carro, Moto)
        2.  Marca (Fabricante)
        3.  Tipo (SUV, Sedan, Hatch, Street, Naked, Custom, etc)
        4.  Caso o tipo retornado não esteja na lista abaixo:
            "Hatch",
            "Sedan",
            "SUV",
            "Crossover",
            "Picape",
            "Perua",
            "Conversível",
            "Coupé",
            "Minivan",
            "Van",
            "Utilitário",
            "Street",
            "Esportiva",
            "Touring",
            "Scooter",
            "Trail",
            "BigTrail",
            "Custom",
            "Off-road",
            "Naked"
        retorne no campo tipo o valor constante na lista que mais se adeque(ex: Adventure = BigTrail)
        caso algum dos campos não possa ser identificado, retorne como null no json

        Formate sua resposta como um objeto JSON limpo com estes campos:
        {
            "category": "",
            "brand": "",
            "type": "",
            "confidence": 0.0
        }

        Para confidence, forneça um valor entre 0 e 1 representando o quão confiante você está na identificação geral.
        Responda APENAS com o objeto JSON acima, preenchido em português brasileiro. Campos não especificados podem ficar em branco.
        `;

    const result = await model.generateContent([imagePart, prompt]);
    const response = await result.response;
    const text = response.text();


    // Limpa a resposta removendo markdown
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
      const jsonResponse = JSON.parse(cleanedText);
      return {
        success: true,
        data: jsonResponse,
      };
    } catch (jsonError) {
      console.error("Erro ao processar resposta JSON");
      return {
        success: false,
        message: "Erro ao processar resposta da IA. Verifique o formato.",
      };
    }
  } catch (error) {
    console.error("Erro na busca por imagem");
    return {
      success: false,
      message: "Erro na busca por imagem: Erro ao processar imagem.",
    };
  }
};
