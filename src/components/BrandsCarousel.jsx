"use client";
// Importe os componentes e estilos necessários do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

import { Navigation, Pagination } from 'swiper/modules';

const BrandsCarousel = ({ brands }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="pb-10 pt-4 px-2 sm:px-12"
        >
            {brands.map((make) => (
                <SwiperSlide key={make.id || make.name}>
                    <Link
                        href={`/vehicles/?brand=${make.name}`}
                        className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer flex flex-col h-full"
                    >
                        <div className="h-16 w-auto mx-auto mb-2 relative flex items-center justify-center bg-gray-50 rounded-md w-full">
                            {make.imageUrl && make.imageUrl.trim() !== "" ? (
                                <CldImage
                                    src={make.imageUrl}
                                    alt={make.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                                    className="object-contain p-2"
                                />
                            ) : (
                                <span className="text-gray-400 font-bold">{make.name.charAt(0)}</span>
                            )}
                        </div>
                        <h3 className="font-medium mt-auto">{make.name}</h3>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default BrandsCarousel;
