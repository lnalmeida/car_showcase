import React from "react";
import BookingForm from "../_components/BookingForm";
import { PlusCircle } from "lucide-react";

export const metadata = {
    title: "Novo Agendamento | Administração",
    description: "Crie um novo agendamento de test-drive ou visita.",
};

export default function CreateBookingPage() {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                    <PlusCircle className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Novo Agendamento</h1>
                    <p className="text-muted-foreground">Preencha os dados abaixo para reservar um horário com o cliente</p>
                </div>
            </div>

            <BookingForm />
        </div>
    );
}
