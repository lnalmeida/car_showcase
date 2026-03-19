import BookingsList from "./_components/BookingsList";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Agendamentos e Test Drives | JF Veículos",
    description: "Gerenciamento de visitas e experiências de direção.",
};

export default function TestDrivesPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <CalendarDays className="h-8 w-8 text-blue-600" />
                        Agendamentos e Test Drives
                    </h2>
                    <p className="text-muted-foreground">
                        Gestão de visitas presenciais e experiências de test drive dos clientes.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/admin/test-drives/create">
                        <Button className="bg-black hover:bg-zinc-800">
                            <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4">
                <BookingsList />
            </div>
        </div>
    );
}
