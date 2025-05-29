"use client";

import React from "react";
import { useState } from "react";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CarIcon, Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

const CarCard = ({ car }) => {
  const [isSaved, setIsSaved] = useState(car.wishlisted);
  const router = useRouter();

  const handleToggledSaved = async (e) => {
    setIsSaved(!isSaved);
  };
  return (
    <Card className="overflow-hidden hover:shadow-lg transition group py-0">
      <div className="relative h-60">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full">
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="mt-2 mb-2 w-full h-full bg-gray-200 flex items-center justify-center">
            <CarIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full text-red-600 absolute top-2 right-2 p-1.5 ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={handleToggledSaved}
        >
          <Heart className={isSaved ? "fill-red-600" : ""} size={20} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col mb-2">
          <h3 className="text-lg font-bold line-clamp-1">
            {car.make} {car.model}
          </h3>
          <span className="text-xl font-bold text-blue-600">
            {Intl.NumberFormat("pt-BRbr", {
              style: "currency",
              currency: "BRL",
            }).format(car.price)}
          </span>
        </div>

        <div className="text-gray-600 mb-2 flex items-center">
          <span>{car.year}</span>
          <span className="mx-2">•</span>
          <span>{car.transmission}</span>
          <span className="mx-2">•</span>
          <span>{car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="bg-gray-100">
            {car.bodyType}
          </Badge>
          <Badge variant="outline" className="bg-gray-100">
            {car.mileage.toLocaleString().replace(",", ".")} km
          </Badge>
          <Badge variant="outline" className="bg-gray-100">
            {car.color}
          </Badge>
        </div>

        <div className="flex justify-between">
          <Button
            className="flex-1"
            onClick={() => router.push(`/car/${car.id}`)}
          >
            Ver carro
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
