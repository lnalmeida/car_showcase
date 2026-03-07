import React from "react";
import { getVehicleTypes } from "@/actions/vehicleTypes";
import { getCategories } from "@/actions/categories";
import { VehicleTypesManager } from "./_components/VehicleTypesManager";

export const metadata = {
    title: "Gerenciar Tipos | Admin",
};

export default async function VehicleTypesSettingsPage() {
    const [typesRes, categoriesRes] = await Promise.all([
        getVehicleTypes(),
        getCategories()
    ]);

    const initialTypes = typesRes.success ? typesRes.data : [];
    const categories = categoriesRes.success ? categoriesRes.data : [];

    return (
        <VehicleTypesManager initialTypes={initialTypes} categories={categories} />
    );
}
