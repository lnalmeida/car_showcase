"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

const fileToBase64 = async (file) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  return base64;
};

// export const processVehicleImageWithAI = async (file) => {
//   // Lógica da IA
//   try {
//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error("Missing GEMINI_API_KEY");
//     }

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const base64Image = await fileToBase64(file);

//     const imagePart = {
//       inlineData: {
//         data: base64Image,
//         mimeType: file.type,
//       },
//     };

//     const prompt = `
//         Analise this vehicle image and extract the following inform,ation:
//         1.  Category (Carro, Moto)
//         2.  Brand (Fabricante)
//         3.  Type(SUV, Sedan, Hatch, Street, Naked, Custom, etc)
//         4.  Model
//         5.  Year (approximately)
//         6.  Color
//         7.  Seats
//         8.  Doors
//         9.  Fuel Type
//         10. Engine Size(1.0, 2.4, 150cc, etc)
//         10. Transmission type (your best guess, CVT, Manual, Automático, etc )
//         11. Price (Your best guess, use FIPE if possible)
//         12. Short Description to be added to a vehicles listing

//         Format your response as a clean JSON object ith these fields:
//         {
//             "category": "",
//             "brand": "",
//             "type": "",
//             "model": "",
//             "year": 0000,
//             "color": "",
//             "seats": 0,
//             "doors": 0,
//             "fuelType": "",
//             "engineSize": "",
//             "transmission": "",
//             "price": 0,
//             "description": "",
//             "confidence": 0.0,
//         }

//         For confidence, provide a valoue between 0 and 1 representating how confident you are in your overall identification.
//         Only resopond with the JSON object above, which must be filled in in Brazilian Portuguese e Unspecified fields can be left blank, nothing else.
//         `;

//     const result = await model.generateContent([imagePart, prompt]);
//     const response = await result.response;
//     const text = response.text();
//     const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

//     try {
//       const vehicleDetails = JSON.parse(cleanedText);

//       const requiredFields = [
//         "category",
//         "brand",
//         "type",
//         "model",
//         "year",
//         "color",
//         "seats",
//         "doors",
//         "fuelType",
//         "transmission",
//         "engineSize",
//         "price",
//         "description",
//         "confidence",
//       ];

//       const missingFields = requiredFields.filter(
//         (field) => !(field in vehicleDetails)
//       );

//       if (missingFields.length > 0) {
//         throw new Error(
//           `AI response missing required fields: ${missingFields.join(", ")}`
//         );
//       }

//       return {
//         success: true,
//         data: vehicleDetails,
//       };
//     } catch (error) {
//       console.error("Error parsing AI response:", parseError);
//       return {
//         success: false,
//         error: "Error parsing AI response",
//       };
//     }
//   } catch (error) {
//     throw new Error("Gemini API error: " + error.message);
//   }
// };

export const addVehicle = async (params) => {
  console.log("chamou função addVehicle");

  const { vehicleData, images } = params;
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const vehicleId = uuidv4();
    const folderPath = `vehicles/${vehicleId}`;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const base64Data = images[i];

      //skip if image data is not valid
      if (!base64Data || !base64Data.startsWith("data:image/")) {
        console.warn("Skipping invalid image data:", base64Data);
        continue;
      }

      //extracting the base64 part(remove the data:image/png;base64, prefix)
      const base64 = base64Data.split(",")[1];
      const imageBuffer = Buffer.from(base64, "base64");

      //determinating file extension from the data URL
      const mimeMatch = base64Data.match(/data:image\/([a-zA-Z0-9]+);/);
      const fileExtension = mimeMatch ? mimeMatch[1] : "jpeg";

      //creating the filename
      const fileName = `image-${Date.now()}-${i}.${fileExtension}`;
      const filePath = `${folderPath}/${fileName}`;

      //uploading to supabase

      const { data, error } = await supabase.storage
        .from("jf-veiculos-images")
        .upload(filePath, imageBuffer, {
          contentType: `image/${fileExtension}`,
        });

      if (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to uploading image: ${error.message}`);
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/jf-veiculos-images/${filePath}`;
      console.log("Public URL:", publicUrl);

      imageUrls.push(publicUrl);

      if (imageUrls.length === 0) {
        throw new Error("No images uploaded");
      }
    }
    const vehicle = await db.vehicle.create({
      data: {
        // id: vehicleId,
        category: vehicleData.category,
        vehicleType: vehicleData.vehicleType ?? null,
        vehicleBrand: vehicleData.vehicleBrand ?? null,
        model: vehicleData.model,
        year: parseInt(vehicleData.year),
        price: parseFloat(vehicleData.price) ?? 0,
        color: vehicleData.color,
        featured: vehicleData.featured,
        seats: parseInt(vehicleData).seats ?? 5,
        doors: parseInt(vehicleData).doors ?? 2,
        engineSize: vehicleData.engineSize,
        mileage: parseInt(vehicleData.mileage) || 0,
        fuelType: vehicleData.fuelType,
        transmission: vehicleData.transmission,
        description: vehicleData.description,
        optionals: vehicleData.optionals,
        images: imageUrls,
      },
    });

    revalidatePath("/admin/vehicles");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw new Error(`Failed to add vehicle: ${error.message}`);
  }
};

export const processVehicleImageWithAI = async (file) => {
  console.log("🚀 Iniciando análise de imagem do veículo..."); // Debug log

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        4.  Modelo
        5.  Ano (aproximadamente)
        6.  Cor
        7.  Assentos
        8.  Portas
        9.  Tipo de Combustível
        10. Tamanho do Motor (1.0, 2.4, 150cc, etc)
        11. Tipo de Transmissão (seu melhor palpite, CVT, Manual, Automático, etc)
        12. Preço (Seu melhor palpite, use FIPE se possível)
        13. Descrição curta para ser adicionada a um anúncio de veículos

        Formate sua resposta como um objeto JSON limpo com estes campos:
        {
            "category": "",
            "brand": "",
            "type": "",
            "model": "",
            "year": 0,
            "color": "",
            "seats": 0,
            "doors": 0,
            "fuelType": "",
            "engineSize": "",
            "transmission": "",
            "price": 0,
            "description": "",
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

    console.log("🧹 Texto limpo:", cleanedText); // Debug log

    // Parse do JSON
    const vehicleDetails = JSON.parse(cleanedText);

    // Validação dos campos obrigatórios
    const requiredFields = [
      "category",
      "brand",
      "type",
      "model",
      "year",
      "color",
      "seats",
      "doors",
      "fuelType",
      "transmission",
      "engineSize",
      "price",
      "description",
      "confidence",
    ];

    const missingFields = requiredFields.filter(
      (field) => !(field in vehicleDetails)
    );

    if (missingFields.length > 0) {
      console.warn("⚠️ Campos ausentes:", missingFields); // Debug log
      throw new Error(
        `AI response missing required fields: ${missingFields.join(", ")}`
      );
    }

    console.log("✅ Análise concluída com sucesso!", vehicleDetails); // Debug log

    return {
      success: true,
      data: vehicleDetails,
    };
  } catch (error) {
    console.error("❌ Erro na análise da imagem:", error.message);
    console.error("Stack trace:", error.stack); // Debug adicional

    return {
      success: false,
      error: `Erro na análise da imagem: ${error.message}`,
    };
  }
};
