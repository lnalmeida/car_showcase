import { getSale } from "@/actions/sales";
import SaleForm from "../../_components/SaleForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditSalePage({ params }) {
    const { saleId } = await params;

    const result = await getSale(saleId);

    if (!result.success) {
        redirect("/admin/sales");
    }

    const sale = result.data;

    // Se já foi entregue, não permitimos editar via URL direta também
    if (sale.deliveryDate) {
        redirect("/admin/sales");
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/admin/sales">
                        <Button variant="ghost" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100">
                        Editar Venda
                    </h2>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <SaleForm sale={sale} vehicle={sale.vehicle} />
            </div>
        </div>
    );
}
