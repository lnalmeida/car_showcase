import React from "react";
import { getUserSavedVehicles } from "@/actions/vehicleCatalog";
import { checkUser } from "@/lib/checkUser";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import SavedVehiclesList from "@/components/SavedVehiclesList";

export default async function SavedCarsPage() {
  const user = await checkUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/saved-cars");
  }

  // Busca inicial feita no servidor para SSR (sem suspense flicker no primeiro load)
  const response = await getUserSavedVehicles(user.id);
  const initialVehicles = response.success ? (response.data || []) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Lista reativa — reage ao invalidateQueries(["savedVehicles"]) do VehicleCard */}
      <section className="container mx-auto px-4 py-8">
        <SavedVehiclesList userId={user.id} initialData={initialVehicles} />
      </section>
    </div>
  );
}