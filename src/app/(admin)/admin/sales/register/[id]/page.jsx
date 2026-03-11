import React from "react";
import { notFound } from "next/navigation";
import { getVehicle } from "@/actions/vehicles";
import { getAdmin } from "@/actions/admin";
import SaleForm from "../../_components/SaleForm";
import { ShoppingCart } from "lucide-react";

export const metadata = {
    title: "Registrar Venda | Administração",
    description: "Finalize a venda do veículo e atualize o estoque.",
};

const RegisterSalePage = async ({ params }) => {
    const { id } = await params;
    const vehicleResponse = await getVehicle(id);
    const adminResponse = await getAdmin();

    if (!vehicleResponse.success || !vehicleResponse.data) {
        return notFound();
    }

    const vehicle = vehicleResponse.data;
    const sellerId = adminResponse.authorized ? adminResponse.user.id : null;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <ShoppingCart size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Registrar Venda</h1>
                    <p className="text-muted-foreground">Complete os dados para fechar o negócio e baixar o estoque</p>
                </div>
            </div>

            <SaleForm vehicle={vehicle} sellerId={sellerId} />
        </div>
    );
};

export default RegisterSalePage;
