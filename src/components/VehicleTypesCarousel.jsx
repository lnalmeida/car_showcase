"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { Navigation, Pagination } from "swiper/modules";

const VehicleTypesCarousel = ({ bodyTypes = [] }) => {
  const count = bodyTypes.length;

  // Calcula quantos slides mostrar por breakpoint,
  // nunca excedendo o total de itens disponíveis
  const clamp = (val) => Math.min(val, count);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={clamp(2)}
      centeredSlides={count <= 3}
      breakpoints={{
        480: { slidesPerView: clamp(3), spaceBetween: 16 },
        768: { slidesPerView: clamp(4), spaceBetween: 20, centeredSlides: count <= 4 },
        1024: { slidesPerView: clamp(5), spaceBetween: 24, centeredSlides: count <= 5 },
        1280: { slidesPerView: clamp(6), spaceBetween: 24, centeredSlides: count <= 6 },
      }}
      navigation
      pagination={{ clickable: true }}
      className="!pb-10 !pt-4 !px-2 sm:!px-10"
    >
      {bodyTypes.map((type) => (
        <SwiperSlide key={type.id} className="!h-auto">
          <Link
            href={`/vehicles/?type=${encodeURIComponent(type.name)}`}
            className="relative group cursor-pointer block"
          >
            {/* Proporção fixa 4:3 que se adapta à largura do slide */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
              {type.imageUrl || type.image ? (
                <CldImage
                  src={type.imageUrl || type.image}
                  alt={type.name}
                  fill
                  crop="fill"
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-2xl">
                  {type.name.charAt(0)}
                </span>
              )}

              {/* Gradiente + nome sempre visível */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-lg flex items-end">
                <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight px-2 pb-2 line-clamp-1">
                  {type.name}
                </h3>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VehicleTypesCarousel;
