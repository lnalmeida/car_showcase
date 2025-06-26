"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { serializeVehicleData } from "@/lib/helpers";

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
            "year": "",
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

export const addVehicle = async (params) => {
  console.log("🚀 Chamou função addVehicle");

  const { vehicleData, images } = params;
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    if (user.role !== "ADMIN") throw new Error("Unauthorized");

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
        console.error("❌ Error uploading image:", error);
        throw new Error(`Failed to uploading image: ${error.message}`);
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/jf-veiculos-images/${filePath}`;
      console.log("Public URL:", publicUrl);

      imageUrls.push(publicUrl);
      console.log("Image URLs:", imageUrls);

      if (imageUrls.length === 0) {
        throw new Error("No images uploaded");
      }
    }
    const vehicle = await db.vehicle.create({
      data: {
        category: vehicleData.category,
        vehicleType: vehicleData.vehicleType ?? null,
        vehicleBrand: vehicleData.vehicleBrand ?? null,
        model: vehicleData.model,
        year: parseInt(vehicleData.year),
        price: parseFloat(vehicleData.price) ?? 0,
        color: vehicleData.color,
        featured: vehicleData.featured,
        seats: parseInt(vehicleData.seats) ?? 5,
        doors: parseInt(vehicleData.doors) ?? 2,
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
    console.error("❌ Error adding vehicle:", error);
    throw new Error(`Failed to add vehicle: ${error.message}`);
  }
};

export const getVehicles = async (params = {}) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const { search, page = 0, limit = 10, filter, sortBy, order } = params;

    let where = {};

    if (filter) {
      where.category = {
        equals: filter,
        mode: "insensitive",
      };
    }

    if (search) {
      where.OR = [
        {
          category: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          vehicleType: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          vehicleBrand: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          status: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const orderByClause = sortBy ? { [sortBy]: order } : { createdAt: "desc" };

    const [vehicles, totalCount] = await Promise.all([
      db.vehicle.findMany({
        where,
        orderBy: orderByClause,
        skip: page * limit,
        take: limit,
      }),
      db.vehicle.count({
        where,
      }),
    ]);

    const result = await Promise.all(
      vehicles.map((v) => serializeVehicleData(v))
    );

    // console.log("Serialized vehicles data:", result);

    return {
      success: true,
      data: result,
      totalCount,
    };
  } catch (error) {
    console.error("❌ Error getting vehicles:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getVehicle = async (id) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const vehicle = await db.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) throw new Error("Vehicle not found");

    return {
      success: true,
      data: serializeVehicleData(vehicle),
    };
  } catch (error) {
    console.error("❌ Erro ao buscar veículo:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateVehicle = async (id, vehicleData) => {
  console.log("Chama a função updateVehicle no backend");
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");
    if (user.role !== "ADMIN") throw new Error("Unauthorized");

    console.log("📥 [updateVehicle] Dados recebidos do cliente:", vehicleData);

    const dataForDB = {};

    if (vehicleData.vehicleType !== undefined)
      dataForDB.vehicleType = vehicleData.vehicleType;
    if (vehicleData.vehicleBrand !== undefined)
      dataForDB.vehicleBrand = vehicleData.vehicleBrand;
    if (vehicleData.model !== undefined) dataForDB.model = vehicleData.model;
    if (vehicleData.year !== undefined)
      dataForDB.year = parseInt(vehicleData.year);
    if (vehicleData.price !== undefined)
      dataForDB.price = parseFloat(vehicleData.price);
    if (vehicleData.color !== undefined) dataForDB.color = vehicleData.color;
    if (vehicleData.status !== undefined) dataForDB.status = vehicleData.status;
    if (vehicleData.mileage !== undefined)
      dataForDB.mileage = parseInt(vehicleData.mileage);
    if (vehicleData.fuelType !== undefined)
      dataForDB.fuelType = vehicleData.fuelType;
    if (vehicleData.optionals !== undefined)
      dataForDB.optionals = vehicleData.optionals;

    if (vehicleData.featured !== undefined) {
      if (vehicleData.featured === true) {
        const vehicle = await db.vehicle.findUnique({ where: { id } });
        if (!vehicle) throw new Error("Vehicle not found");

        if (vehicle.status !== "Disponível") {
          throw new Error(
            "Apenas veículos com status 'Disponível' podem ser destacados."
          );
        }
      }

      dataForDB.featured = vehicleData.featured;
    }

    if (Object.keys(dataForDB).length === 0) {
      console.log(
        "⚠️ [updateVehicle] Objeto de dados vazio. Nenhuma atualização será feita."
      );

      return { success: true, message: "Nenhuma informação foi alterada." };
    }

    console.log(
      "📦 [updateVehicle] Objeto final para o banco de dados:",
      dataForDB
    );

    const updatedVehicle = await db.vehicle.update({
      where: { id },
      data: dataForDB,
    });

    console.log("✅ Veículo atualizado com sucesso no banco de dados.");

    revalidatePath("/admin/vehicles");

    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao atualizar veiculo:", error.message);
    return { success: false, error: error.message };
  }
};

export const removeVehicle = async (id) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    if (user.role !== "ADMIN") throw new Error("Unauthorized");

    const vehicle = await db.vehicle.findUnique({
      where: { id },
      select: {
        images: true,
      },
    });

    if (!vehicle) {
      return {
        success: false,
        error: "Vehicle not found",
      };
    }

    await db.vehicle.delete({
      where: { id },
    });

    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      const filePaths = vehicle.images
        .map((imageUrl) => {
          const uri = new URL(imageUrl);
          const pathMatch = uri.pathname.match(/vehicles\/(.*)/);
          return pathMatch ? pathMatch[1] : null;
        })
        .filter(Boolean);

      if (filePaths.length > 0) {
        const res = await supabase.storage
          .from("jf-veiculos-images")
          .remove(filePaths);
        if (res.error) {
          console.error("❌ Erro ao deletar imagens:", res.error.message);
          //Caso falhe a deleção da imagem, continua o processo
        }
      }
    } catch (storageError) {
      console.error(
        "❌ Erro ao deletar imagens no Storage:",
        storageError.message
      );
    }

    revalidatePath("/admin/vehicles");

    return {
      success: true,
    };
  } catch (error) {
    console.error("❌ Erro ao deletar veiculo:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
