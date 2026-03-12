"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock, Car, MapPin, Edit2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function BookingCard({ booking, onConfirm, onCancel }) {
  const { id, visitDate, startTime, endTime, status, isTestDrive, Vehicle, notes } = booking;

  // Validação de 24h para exibição de botões
  const now = new Date();
  const bookingDateTime = new Date(visitDate);
  const [hours, minutes] = startTime.split(":");
  bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

  const diffInMs = bookingDateTime.getTime() - now.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const canAction = (status === "PENDING" || status === "CONFIRMED");

  const formattedDate = format(new Date(visitDate), "dd 'de' MMMM', 'yyyy", { locale: ptBR });

  return (
    <Card className="overflow-hidden border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-gray-50/50 border-b p-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <Calendar size={16} className="text-blue-600" />
            {formattedDate}
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Veículo Image */}
          <div className="relative w-full sm:w-32 h-40 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {Vehicle?.images?.[0] ? (
              <Image
                src={Vehicle.images[0]}
                alt={Vehicle.model}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <Car size={32} />
              </div>
            )}
            <div className="absolute top-1 right-1">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm ${isTestDrive ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}>
                {isTestDrive ? "TEST DRIVE" : "VISITA"}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900 leading-tight">
                {Vehicle ? `${Vehicle.brand?.name} ${Vehicle.model}` : "Visita à Concessionária"}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin size={14} /> JD Veículos - Duque de Caxias
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-blue-50 p-1.5 rounded-md">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-none mb-1">Horário</p>
                  <p className="font-semibold text-gray-700">{startTime} - {endTime}</p>
                </div>
              </div>
              
              {Vehicle && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="bg-blue-50 p-1.5 rounded-md">
                    <Car size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground leading-none mb-1">Placa</p>
                    <p className="font-semibold text-gray-700">{Vehicle.plate || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>

            {notes && (
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 italic text-sm text-gray-600">
                &ldquo;{notes}&rdquo;
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {canAction && (
        <CardFooter className="bg-gray-50/30 border-t p-3 flex flex-wrap gap-2 justify-end">
          {/* Botão de Cancelar sempre aparece para agendamentos ativos */}
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
            onClick={() => onCancel(id, diffInHours < 24)}
          >
            <XCircle size={16} className="mr-2" />
            Cancelar
          </Button>

          {/* Botão Confirmar apenas se estiver Pendente */}
          {status === "PENDING" && (
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onConfirm(id, diffInHours < 24)}
            >
              <Clock size={16} className="mr-2" />
              Confirmar Presença
            </Button>
          )}

          {/* Botão Editar apenas com 24h de antecedência */}
          {diffInHours >= 24 && (
            <Link href={`/reservations/${id}/edit`}>
              <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-700 border-blue-100">
                <Edit2 size={16} className="mr-2" />
                Editar
              </Button>
            </Link>
          )}

          {diffInHours < 24 && (
             <p className="text-[10px] w-full text-muted-foreground italic mt-1 text-right">
               * Alterações restritas (menos de 24h).
             </p>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
