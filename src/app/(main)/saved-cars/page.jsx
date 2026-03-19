import React from "react";
import { getUserSavedVehicles } from "@/actions/vehicleCatalog";
import { checkUser } from "@/lib/checkUser";
import VehicleCard from "@/components/VehicleCard";
import { Heart, Car, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function SavedCarsPage() {
  const user = await checkUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/saved-cars");
  }

  const response = await getUserSavedVehicles(user.id);

  if (!response.success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative py-4 md:py-7 dotted-background">
          <div className="px-12 py-8">
            <div className="flex items-center justify-center mb-4">
              <Link href="/vehicles">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar aos Veículos
                </Button>
              </Link>
            </div>
            <h1 className="text-5xl text-white font-bold text-center mb-2">
              Meus Veículos Favoritos
            </h1>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Erro ao carregar favoritos
              </h3>
              <p className="text-gray-600 mb-4">
                Não foi possível carregar seus veículos favoritos: {response.message}
              </p>
              <div className="flex gap-2 justify-center">
                <Link href="/vehicles">
                  <Button variant="outline">
                    Explorar Veículos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const savedVehicles = response.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-4 md:py-7 dotted-background">
        <div className="px-12 py-8">
          <div className="flex items-center justify-center mb-4">
            <Link href="/vehicles">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Veículos
              </Button>
            </Link>
          </div>
          <h1 className="text-5xl text-white font-bold text-center mb-2">
            Meus Veículos Favoritos
          </h1>
          <p className="text-white/80 text-center text-lg">
            {savedVehicles?.length || 0} veículo{(savedVehicles?.length || 0) !== 1 ? 's' : ''} salvo{(savedVehicles?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {!savedVehicles || savedVehicles.length === 0 ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum veículo favorito
              </h3>
              <p className="text-gray-600 mb-4">
                Você ainda não salvou nenhum veículo como favorito.
              </p>
              <Link href="/vehicles">
                <Button className="bg-black hover:bg-zinc-800">
                  Explorar Veículos
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} userId={user.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}