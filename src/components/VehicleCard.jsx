"use client";

import React from "react";
import { useState } from "react";

import { Calendar, Gauge, Star } from "lucide-react";
import { ManualTransmissions, MotorizationEngine } from "@/assets/icons/icons";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CarIcon, Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

const VehicleCard = ({ vehicle }) => {
  const [isSaved, setIsSaved] = useState(vehicle.wishlisted);
  const router = useRouter();

  const handleToggledSaved = async (e) => {
    setIsSaved(!isSaved);
  };
  return (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Imagem */}
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <Link href={`/vehicles/${vehicle.id}`}>
          <img
            src={
              vehicle.images?.[0] ||
              `https://via.placeholder.com/400x240/e2e8f0/64748b?text=${vehicle.vehicleBrand}+${vehicle.model}`
            }
            alt={`${vehicle.vehicleBrand} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-2 right-3">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full opacity-[0.5] bg-gray-100 text-red-600 absolute right-2 p-1.5 ${
              isSaved
                ? "text-red-500 hover:text-red-600 hover:opacity-100 transition-opacity"
                : "text-gray-600 hover:text-gray-900 hover:opacity-100 transition-opacity"
            }`}
            onClick={handleToggledSaved}
          >
            <Heart className={isSaved ? "fill-red-600" : ""} size={20} />
          </Button>
        </div>
        {vehicle.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="text-yellow-600 text-md bg-gray-200 hover:bg-gray-300">
              <Star className="text-yellow-600 mr-4 fill-current" size={16} />
              Destaque
            </Badge>
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
          {vehicle.vehicleBrand} {vehicle.model}
        </h3>

        <div className="mb-3">
          <div className="text-2xl font-bold text-blue-600">
            R$ {parseFloat(vehicle.price).toLocaleString("pt-BR")}
          </div>
        </div>

        {/* Informações */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{vehicle.year}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MotorizationEngine className="h-4 w-4 mr-2" />
            <span>{vehicle.engineSize}</span>
          </div>

          {/* {vehicle.mileage > 0 && ( */}
          <div className="flex items-center text-sm text-gray-600">
            <Gauge className="h-4 w-4 mr-2" />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </div>
          {/*   )*/}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="text-xs">
            {vehicle.vehicleType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {vehicle.fuelType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {vehicle.transmission}
          </Badge>
        </div>

        {/* Botão */}
        <Button className="w-full py-6 text-md" size="sm">
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
