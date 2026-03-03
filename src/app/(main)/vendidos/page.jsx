import React from "react";
import { getSoldVehicles, getUserSavedVehicles } from "@/actions/vehicleCatalog";
import VehicleCard from "@/components/VehicleCard";
import { checkUser } from "@/lib/checkUser";

export default async function SoldVehiclesPage({ searchParams }) {
    const params = await searchParams;
    const pageNum = parseInt(params?.page) || 0;

    // Busca os veículos vendidos no servidor
    const response = await getSoldVehicles({ page: pageNum, limit: 30 });
    const vehicles = response.success ? response.data : [];

    // Pega o usuário logado para saber quais veículos estão favoritados
    let savedVehicleIds = new Set();
    const user = await checkUser();
    if (user) {
        const savedResponse = await getUserSavedVehicles(user.id);
        if (savedResponse.success) {
            savedVehicleIds = new Set(savedResponse.data.map((sv) => sv.id));
        }
    }

    // Sincroniza o status de favorito
    const vehiclesWithWishlist = vehicles.map((v) => ({
        ...v,
        wishListed: savedVehicleIds.has(v.id),
    }));

    return (
        <>
            <section className="relative py-4 md:py-7 dotted-background">
                <div className="px-12 py-8">
                    <h1 className="text-5xl text-white font-bold text-center mb-2">
                        Showroom de Entregas
                    </h1>
                    <p className="text-center text-gray-300 mt-2 max-w-2xl mx-auto">
                        Confira os veículos que já encontraram seus novos donos. Celebre conosco o sucesso de nossos clientes!
                    </p>
                </div>
            </section>
            <section className="container mx-auto px-4 py-12">
                {vehiclesWithWishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {vehiclesWithWishlist.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm border mt-8">
                        <h3 className="text-xl font-medium text-gray-400">Nenhum veículo vendido listado no momento.</h3>
                        <p className="text-gray-500 mt-2">Assim que a concessionária realizar entregas, elas aparecerão aqui.</p>
                    </div>
                )}
            </section>
        </>
    );
}
