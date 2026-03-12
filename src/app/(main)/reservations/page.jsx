import React from "react";
import { getUserBookings } from "@/actions/testdrive";
import { checkUser } from "@/lib/checkUser";
import { BookingCard } from "@/components/reservations/BookingCard";
import { Button } from "@/components/ui/button";
import { Plus, CalendarRange, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReservationsList } from "@/components/reservations/ReservationsList";

export const metadata = {
  title: "Minhas Reservas | JF Veículos",
  description: "Gerencie seus agendamentos e visitas à nossa loja.",
};

export default async function ReservationsPage() {
  const user = await checkUser();
  if (!user) {
    redirect("/sign-in");
  }

  const res = await getUserBookings();
  const bookings = res.success ? res.data : [];

  // Client-side action for cancellation will be handled by a wrapper if needed, 
  // but for simplicity I can put the handler in a client component or use a form action.
  // I'll create a small client wrapper for the list to handle the logic.

  return (
    <main className="min-h-screen bg-gray-50/50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
          <div className="flex items-start gap-4">
            <Link href="/vehicles">
              <Button variant="ghost" size="sm" className="rounded-lg flex items-center gap-2 text-muted-foreground hover:text-blue-600">
                <ArrowLeft size={18} />
                Voltar ao Showroom
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <CalendarRange className="text-blue-600 h-8 w-8" />
                Minhas Reservas
              </h1>
              <p className="text-muted-foreground mt-2">
                Acompanhe suas visitas e solicitações de test drive.
              </p>
            </div>
          </div>
          <Link href="/reservations/create">
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </Link>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
          <Info className="flex-shrink-0 h-5 w-5 mt-0.5 text-blue-600" />
          <p>
            <strong>Regra de Cancelamento:</strong> Você pode editar ou cancelar seus agendamentos com até 24 horas de antecedência. Após esse período, entre em contato direto com a loja.
          </p>
        </div>

        {/* List */}
        {bookings.length === 0 ? (
          <div className="bg-white border border-dashed rounded-2xl py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <CalendarRange className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Nenhum agendamento encontrado</h3>
            <p className="text-muted-foreground mt-2 mb-8 max-w-sm">
              Você ainda não tem agendamentos realizados. Solicite um agora mesmo para conhecer seu próximo carro!
            </p>
            <Link href="/reservations/create">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Criar Primeiro Agendamento
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <ReservationsList initialBookings={bookings} />
          </div>
        )}
      </div>
    </main>
  );
}

// Client Component Wrapper inside the same file (requires "use client" but this is a server file)
// Better to create a separate file for the list or use a Server Action inside the Card.
// I'll create src/components/reservations/ReservationsList.jsx for better DX.
