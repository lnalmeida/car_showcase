import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";

import HomeSearch from "@/components/HomeSearch";
import VehicleCard from "@/components/VehicleCard";
import VehicleTypesCarousel from "@/components/VehicleTypesCarousel";
import BrandsCarousel from "@/components/BrandsCarousel";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";

// Fetch Actions
import { getCategories } from "@/actions/categories";
import { getBrands } from "@/actions/brands";
import { getVehicleTypes } from "@/actions/vehicleTypes";
import { getFeaturedVehicles } from "@/actions/home";
import { checkUser } from "@/lib/checkUser";

export const revalidate = 3600; // revalidate at most every hour

export default async function Home() {
  // SSR Data Fetching
  const [catsRes, brandsRes, typesRes] = await Promise.all([
    getCategories(),
    getBrands(),
    getVehicleTypes(),
  ]);

  let allMakes = [];
  let carBodyTypes = [];
  let motorcycleBodyTypes = [];

  if (catsRes.success && brandsRes.success && typesRes.success) {
    const categories = catsRes.data;
    const carCategory = categories.find((c) => c.name.toLowerCase() === "carro");
    const motoCategory = categories.find((c) => c.name.toLowerCase() === "moto");

    const categoryIds = [carCategory?.id, motoCategory?.id].filter(Boolean);
    allMakes = brandsRes.data.filter((b) => categoryIds.includes(b.categoryId));

    if (carCategory) {
      carBodyTypes = typesRes.data.filter((t) => t.categoryId === carCategory.id);
    }
    if (motoCategory) {
      motorcycleBodyTypes = typesRes.data.filter((t) => t.categoryId === motoCategory.id);
    }
  }

  return (
    <div className="pt-20 flex flex-col">
      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Seu carro ideal está na JFA Veículos
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Pesquisa avançada de carros usando IA e agendamento de visitas e
              test-drive para nossos veículos.
            </p>
          </div>
          <HomeSearch />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Novidades</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/vehicles">
                Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <React.Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-54 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border animate-pulse">
                  <div className="aspect-video bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <FeaturedSection />
          </React.Suspense>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Fabricantes</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/vehicles">
                Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <BrandsCarousel brands={allMakes} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Porque escolher a JFA Veículos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3>Grande variedade de veículos</h3>
              <p className="text-gray-600">
                Temos uma grande variedade de veículos para você escolher, de
                diferentes fabricantes e modelos
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3>Pontualidade e agendamento</h3>
              <p className="text-gray-600">
                Nossos agendamentos e test drives sao pontuais e eficientes,
                garantindo uma experiência de compra excepcional.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3>Segurança</h3>
              <p className="text-gray-600">
                Todos os nossos veículos passam por uma rigorosa verificação
                documental e mecânica, garantindo total confiabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Carros</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href={`/vehicles?category=carro`}>
                Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <VehicleTypesCarousel bodyTypes={carBodyTypes} />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Motos</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href={`/vehicles?category=moto`}>
                Ver Todas <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <VehicleTypesCarousel bodyTypes={motorcycleBodyTypes} />
        </div>
      </section>


      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto pra encontrar seu próximo veículo?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a diversos outros clientes satisfeitos, encontrando o
            veículo perfeito pra você na JFA Veículos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/vehicles"> Ver veículos</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Registre-se agora</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}

// Extracted Server Component to prevent blocking the entire page with auth() checks
async function FeaturedSection() {
  const user = await checkUser();
  const userId = user?.id || null;
  const featuredVehRes = await getFeaturedVehicles(8, userId);
  const featuredVehicles = featuredVehRes.success ? (featuredVehRes.data || []) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-54 gap-6">
      {featuredVehicles.map((vehicle, index) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 2} />
      ))}
    </div>
  );
}
