"use client";
// Importe os componentes e estilos necessários do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
// import { bodyTypes, carMakes, featuredCars } from "@/lib/data";

import { Navigation, Pagination } from 'swiper/modules';

const VehicleTypesCarousel = ({ bodyTypes }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={24} // Espaçamento entre os slides
      slidesPerView={5} // Quantos slides mostrar por vez
      // Configuração para diferentes tamanhos de tela (responsividade)
      breakpoints={{
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      // Habilita a navegação (setas de Próximo/Anterior)
      navigation
      // Habilita a paginação (pontinhos na parte de baixo)
      pagination={{ clickable: true }}
      className="pb-10 pt-4 px-2 sm:px-12"
    >
      {bodyTypes.map((type) => (
        <SwiperSlide key={type.id}>
          <Link
            href={`/vehicles/?type=${type.id || type.name}`}
            className="relative group cursor-pointer"
          >
            <div className="overflow-hidden rounded-lg flex justify-center items-center bg-gray-200 h-28 mb-4 relative">
              {(type.imageUrl || type.image) ? (
                <Image
                  src={type.imageUrl || type.image}
                  alt={type.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              ) : (
                <span className="text-gray-400 font-bold text-xl">{type.name.charAt(0)}</span>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
              <h3 className="text-white font-bold pl-4 pb-2">
                {type.name}
              </h3>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default VehicleTypesCarousel;