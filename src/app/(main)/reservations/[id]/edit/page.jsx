import React from "react";
import { checkUser } from "@/lib/checkUser";
import { getBooking } from "@/actions/testdrive";
import UserBookingForm from "@/components/reservations/UserBookingForm";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, notFound } from "next/navigation";

export const metadata = {
    title: "Editar Agendamento | JF Veículos",
};

export default async function EditReservationPage({ params }) {
    const { id } = await params;
    const user = await checkUser();
    
    if (!user) {
        redirect("/sign-in");
    }

    const res = await getBooking(id);
    if (!res.success || !res.data) {
        notFound();
    }

    const booking = res.data;

    // Segurança: Verificar se o agendamento pertence ao usuário logado
    if (booking.userId !== user.id) {
        redirect("/reservations");
    }

    // Regra de 24h (validação visual/UX no servidor, também validada no Server Action)
    const now = new Date();
    const bookingDateTime = new Date(booking.visitDate);
    const [hours, minutes] = booking.startTime.split(":");
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

    const diffInMs = bookingDateTime.getTime() - now.getTime();
    if (diffInMs / (1000 * 60 * 60) < 24) {
        // Redireciona de volta com aviso seria melhor, mas aqui vamos bloquear
        // por segurança extra se o usuário tentar burlar a URL
        redirect("/reservations");
    }

    return (
        <main className="min-h-screen bg-gray-50/50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/reservations">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Edit size={24} className="text-blue-600" />
                                Editar Agendamento
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm">
                    <UserBookingForm user={user} initialData={booking} />
                </div>
            </div>
        </main>
    );
}
