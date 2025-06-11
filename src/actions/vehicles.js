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

export const processVehicleImageWithAI = async (file) => {
  // Lógica da IA
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-v2" });

    const base64Image = await fileToBase64(file);

    const imagePart = {
      inlineData: {
        data: base64Image,
        type: file.type,
      },
    };

    const prompt = `
        Analise this vehicle image and extract the following inform,ation:
        1.  Category (car, motorcycle)
        1.  Make (manufacturer)
        2.  Model
        3.  Year (approximately)
        4.  Color
        5.  Seats
        6.  Doors
        7.  vehicle type (SUV, Sedan, Hatchback, Street, Naked, Custom, etc)
        8.  Mileage
        9.  Fuel Type
        10. Transmission type (your best guess)
        11. Price (Your best guess)
        12. Short Description to be added to a vehicles listing

        Format your response as a clean JSON object ith these fields:
        {
            "category": "",
            "make": "",
            "model": "",
            "year": 0000,
            "color": "",
            "seats": 0,
            "doors": 0,
            "vehicleType": "",
            "mileage": "",
            "fuelType": "",
            "transmission": "",
            "price": 0,
            "description": "",
            "confidence": 0.0,
        }

        For confidence, provide a valoue between 0 and 1 representating how confident you are in your overall identification.
        Only resopond with the JSON object above, which must be filled in in Brazilian Portuguese e Unspecified fields can be left blank, nothing else.
        `;

    const result = await model.generateContent([imagePart, prompt]);
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
      const vehicleDetails = JSON.parse(cleanedText);

      const requiredFields = [
        "category",
        "make",
        "model",
        "year",
        "color",
        "seats",
        "doors",
        "vehicleType",
        "mileage",
        "fuelType",
        "transmission",
        "price",
        "description",
        "confidence",
      ];

      const missingFields = requiredFields.filter(
        (field) => !(field in vehicleDetails)
      );

      if (missingFields.length > 0) {
        throw new Error(
          `AI response missing required fields: ${missingFields.join(", ")}`
        );
      }

      return {
        success: true,
        data: vehicleDetails,
      };
    } catch (error) {
      console.error("Error parsing AI response:", parseError);
      return {
        success: false,
        error: "Error parsing AI response",
      };
    }
  } catch (error) {
    throw new Error("Gemini API error: " + error.message);
  }
};

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
