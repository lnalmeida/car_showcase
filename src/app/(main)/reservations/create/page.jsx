import React from "react";
import { checkUser } from "@/lib/checkUser";
import UserBookingForm from "@/components/reservations/UserBookingForm";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Novo Agendamento | JF Veículos",
    description: "Solicite um agendamento de visita ou test drive.",
};

export default async function CreateReservationPage({ searchParams }) {
    const { vehicleId } = await searchParams;
    const user = await checkUser();
    
    if (!user) {
        redirect("/sign-in");
    }

    const backUrl = vehicleId ? `/vehicles/${vehicleId}` : "/reservations";

    return (
        <main className="min-h-screen bg-gray-50/50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={backUrl}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <CalendarPlus size={24} className="text-blue-600" />
                                Novo Agendamento
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm">
                    <UserBookingForm user={user} initialVehicleId={vehicleId} />
                </div>
            </div>
        </main>
    );
}
