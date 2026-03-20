import VehicleDetail from "@/components/VehicleDetail";
import React from "react";
import { getVehicle } from "@/actions/vehicles";
import { getDealershipInfo } from "@/actions/dealership";
import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://jfveiculospilar.com.br";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getVehicle(id);

  if (!result.success || !result.data) {
    return {
      title: "Veículo não encontrado",
      description: "Este veículo não está mais disponível em nosso estoque.",
    };
  }

  const vehicle = result.data;
  const title = `${vehicle.vehicleBrand} ${vehicle.model} ${vehicle.year}`;
  const priceFormatted = `R$ ${parseFloat(vehicle.price).toLocaleString("pt-BR")}`;
  const description = `${title} - ${priceFormatted} | ${vehicle.mileage?.toLocaleString("pt-BR")} km | ${vehicle.fuelType} | ${vehicle.transmission}. Confira na JFA Veículos!`;
  const imageUrl = vehicle.images?.[0] || `${BASE_URL}/jf_logo.webp`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `${BASE_URL}/vehicles/${id}`,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/vehicles/${id}`,
    },
  };
}

const VehicleDetailPage = async ({ params }) => {
  const { id } = await params;

  // Fetch vehicle data for JSON-LD structured data
  const [vehicleResult, dealershipResult] = await Promise.all([
    getVehicle(id),
    getDealershipInfo(),
  ]);

  const vehicle = vehicleResult.success ? vehicleResult.data : null;
  const dealership = dealershipResult.success ? dealershipResult.data : null;

  // JSON-LD Structured Data (Schema.org Vehicle/Car)
  let jsonLd = null;
  if (vehicle) {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Car",
      name: `${vehicle.vehicleBrand} ${vehicle.model} ${vehicle.year}`,
      brand: {
        "@type": "Brand",
        name: vehicle.vehicleBrand || "",
      },
      model: vehicle.model,
      vehicleModelDate: String(vehicle.year),
      color: vehicle.color,
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: vehicle.mileage,
        unitCode: "KMT",
      },
      fuelType: vehicle.fuelType,
      vehicleTransmission: vehicle.transmission,
      vehicleEngine: vehicle.engineSize
        ? {
            "@type": "EngineSpecification",
            name: vehicle.engineSize,
          }
        : undefined,
      image: vehicle.images || [],
      description: vehicle.description || "",
      offers: {
        "@type": "Offer",
        price: parseFloat(vehicle.price),
        priceCurrency: "BRL",
        availability:
          vehicle.status === "Disponível"
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
        url: `${BASE_URL}/vehicles/${id}`,
        seller: dealership
          ? {
              "@type": "AutoDealer",
              name: dealership.name || "JFA Veículos",
              address: dealership.address || "",
              telephone: dealership.phone || "",
            }
          : undefined,
      },
      url: `${BASE_URL}/vehicles/${id}`,
    };
  }

  return (
    <>
      {jsonLd && (
        <Script
          id="vehicle-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      )}
      <VehicleDetail id={id} />
    </>
  );
};

export default VehicleDetailPage;
