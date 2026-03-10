import React from "react";
import { StoreInfoForm } from "./_components/StoreInfoForm";
import { getDealershipInfo } from "@/actions/dealership";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const metadata = {
    title: "Informações da Loja | Configurações",
    description: "Gerencie as informações de contato e fachada da sua Loja.",
};

const StoreInfoPage = async () => {
    const result = await getDealershipInfo();

    if (!result.success && result.error !== "Falha ao buscar informações da loja.") {
        return (
            <Alert variant="destructive" className="max-w-4xl mt-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Erro na Leitura</AlertTitle>
                <AlertDescription>
                    {result.error}
                </AlertDescription>
            </Alert>
        )
    }

    // Fallback caso não exista nada no banco ainda
    const initialData = result.data || {};

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Informações do Vendedor / Loja</h1>
                <p className="text-muted-foreground">
                    Gerencie os dados de contato público e a vitrine da concessionária.
                </p>
            </div>

            <StoreInfoForm initialData={initialData} />
        </div>
    );
};

export default StoreInfoPage;
