"use client";

import React, { useState } from "react";
import { BookingCard } from "./BookingCard";
import { cancelBookingByUser, confirmBookingByUser } from "@/actions/testdrive";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ReservationsList({ initialBookings }) {
    const router = useRouter();
    const [bookings, setBookings] = useState(initialBookings);
    const [bookingToAction, setBookingToAction] = useState(null); // { id, type: 'CANCEL' | 'CONFIRM' }
    const [showRestrictedAlert, setShowRestrictedAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancelClick = (id, isRestricted) => {
        if (isRestricted) {
            setShowRestrictedAlert(true);
            return;
        }
        setBookingToAction({ id, type: 'CANCEL' });
    };

    const handleConfirmClick = (id, isRestricted) => {
        // Regra de 24h também se aplica à confirmação manual pelo usuário?
        // O usuário pediu: "se o período for inferior a 24h quando o user tentar cancelar, ele deve ser informado por um alert"
        // Vamos aplicar apenas ao cancelar por enquanto ou a ambos se fizer sentido.
        // Se for < 24h e ele tentar confirmar algo pendente, provavelmente ok, mas se for cancelar, restrito.
        setBookingToAction({ id, type: 'CONFIRM' });
    };

    const confirmAction = async () => {
        if (!bookingToAction) return;
        
        try {
            setLoading(true);
            const { id, type } = bookingToAction;
            const res = type === 'CANCEL' ? await cancelBookingByUser(id) : await confirmBookingByUser(id);
            
            if (res.success) {
                toast.success(type === 'CANCEL' ? "Agendamento cancelado com sucesso." : "Presença confirmada!");
                // Atualiza o estado localmente
                setBookings(prev => prev.map(b => 
                    b.id === id ? { ...b, status: type === 'CANCEL' ? "CANCELLED" : "CONFIRMED" } : b
                ));
                router.refresh();
            } else {
                toast.error(res.error || "Erro ao processar solicitação.");
            }
        } catch (error) {
            toast.error("Erro interno ao processar ação.");
        } finally {
            setLoading(false);
            setBookingToAction(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {bookings.map((booking) => (
                    <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        onCancel={handleCancelClick}
                        onConfirm={handleConfirmClick}
                    />
                ))}
            </div>

            {/* Dialog de Confirmação de Ação (Normal) */}
            <AlertDialog open={!!bookingToAction} onOpenChange={(open) => !open && setBookingToAction(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {bookingToAction?.type === 'CANCEL' ? "Cancelar Agendamento?" : "Confirmar Agendamento?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {bookingToAction?.type === 'CANCEL' 
                                ? "Esta ação mudará o status do seu agendamento para Cancelado. Esta ação não pode ser desfeita por você."
                                : "Deseja confirmar sua presença para este agendamento? Isso informará nossa equipe que você comparecerá."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Voltar</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmAction}
                            disabled={loading}
                            className={bookingToAction?.type === 'CANCEL' ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
                        >
                            {loading ? "Processando..." : (bookingToAction?.type === 'CANCEL' ? "Sim, Cancelar" : "Sim, Confirmar")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Dialog de Restrição < 24h */}
            <AlertDialog open={showRestrictedAlert} onOpenChange={setShowRestrictedAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-600">Alteração Restrita</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-700">
                            Faltam menos de **24 horas** para o seu agendamento. 
                            Por questões de organização da agenda, cancelamentos ou remarcações com prazo inferior a 24h devem ser feitos diretamente com a nossa equipe.
                            <br /><br />
                            Por favor, entre em contato com a loja para prosseguir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="bg-black">Entendido</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
