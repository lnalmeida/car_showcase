"use server";

import { db } from "@/lib/prisma";
import { serializeVehicleData } from "@/lib/helpers";
import { fileToBase64 } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

//Busca os veículos em destaque
export const getFeaturedVehicles = async (limit = 3, userId = null) => {
  try {
    const featuredVehicles = await db.vehicle.findMany({
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

    if (!featuredVehicles.length) {
      return { success: false, message: "Não há veículos em destaque" };
    }

    // Se há um usuário logado, buscar veículos salvos
    let savedVehicleIds = new Set();
    if (userId) {
      try {
        const savedVehicles = await db.userSavedVehicle.findMany({
          where: { userId },
          select: { vehicleId: true }
        });
        savedVehicleIds = new Set(savedVehicles.map(sv => sv.vehicleId));
      } catch (error) {
        console.error("Erro ao buscar veículos salvos:", error.message);
        // Continua sem os dados de salvos em caso de erro
      }
    }

    const serializedFeaturedVehicles = await Promise.all(
      featuredVehicles.map((fv) => serializeVehicleData(fv, savedVehicleIds.has(fv.id)))
    );

    return { success: true, data: serializedFeaturedVehicles };
  } catch (error) {
    console.error("Erro ao buscar veículos em destaque:", error.message);
    return { success: false, message: "Erro ao buscar veículos em destaque" };
  }
};

export const processImageSearch = async (file) => {
  try {
    // rate limit check com arcjet
    const req = await request();

    const decision = await aj.protect({
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });
        return {
          success: false,
          message:
            "Limite de requisições excedido. Tente novamente mais tarde.",
        };
      }
      console.error("Requisição negada:", decision.reason);
      return {
        success: false,
        message: "Requisição negada. Tente novamente mais tarde.",
      };
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

    console.log("📤 Enviando requisição para Gemini API..."); // Debug log
    const result = await model.generateContent([imagePart, prompt]);
    const response = await result.response;
    const text = response.text();

    console.log("📥 Resposta bruta da API:", text); // Debug log

    // Limpa a resposta removendo markdown
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
      const jsonResponse = JSON.parse(cleanedText);
      console.log("✅ IA RESPONDEU COM:");
      console.log("  - category:", jsonResponse.category);
      console.log("  - brand:", jsonResponse.brand);
      console.log("  - type:", jsonResponse.type);
      console.log("  - confidence:", jsonResponse.confidence);
      console.log("✅ Resposta JSON processada:", jsonResponse); // Debug log
      return {
        success: true,
        data: jsonResponse,
      };
    } catch (jsonError) {
      console.error("Erro ao processar resposta JSON:", jsonError.message);
      return {
        success: false,
        message: "Erro ao processar resposta da IA. Verifique o formato.",
      };
    }
  } catch (error) {
    console.error("Erro na busca por imagem:", error.message);
    return {
      success: false,
      message: "Erro na busca por imagem: Erro ao processar imagem.",
    };
  }
};
