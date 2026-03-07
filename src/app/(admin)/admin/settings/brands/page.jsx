import React from "react";
import { getBrands } from "@/actions/brands";
import { getCategories } from "@/actions/categories";
import { BrandsManager } from "./_components/BrandsManager";

export const metadata = {
    title: "Gerenciar Marcas | Admin",
};

export const dynamic = "force-dynamic";

export default async function BrandsSettingsPage() {
    // 1. Fetch initial data on the Server
    const [brandsRes, categoriesRes] = await Promise.all([
        getBrands(),
        getCategories()
    ]);

    const initialBrands = brandsRes.success ? brandsRes.data : [];
    const categories = categoriesRes.success ? categoriesRes.data : [];

    // 2. Pass them purely hydrated to the Client Manager Form
    return (
        <BrandsManager
            initialBrands={initialBrands}
            categories={categories}
        />
    );
}
