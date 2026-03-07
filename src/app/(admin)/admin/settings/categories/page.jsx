import React from "react";
import { getCategories } from "@/actions/categories";
import { CategoriesManager } from "./_components/CategoriesManager";

export const metadata = {
    title: "Gerenciar Categorias | Admin",
};

export default async function CategoriesSettingsPage() {
    const categoriesRes = await getCategories();
    const initialCategories = categoriesRes.success ? categoriesRes.data : [];

    return (
        <CategoriesManager initialCategories={initialCategories} />
    );
}
