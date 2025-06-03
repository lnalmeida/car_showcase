import { Button } from "@/components/ui/button";
import { ChevronRight, Car, Calendar, Shield } from "lucide-react";

import HomeSearch from "@/components/HomeSearch";
import CarCard from "@/components/CarCard";
import { featuredCars, carMakes, bodyTypes } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col">
      {/*<Hero />*/}

      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Seu novo carro está na JF Veículos
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Pesquisa avançada de carros usando IA e agendamento de visitas e
              test-drive para nossos veículos.
            </p>
          </div>
          <HomeSearch />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Novidades</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-54 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Fabricantes</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {carMakes.map((make) => {
              return (
                <Link
                  key={make.name}
                  href={`/cars/?make=${make.name}`}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer"
                >
                  <div className="h-16 w-auto mx-auto mb-2 relative">
                    <Image
                      src={make.image}
                      alt={make.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium">{make.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Porque escolher a JF Veículos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3>Grande variedade de veículos</h3>
              <p className="text-gray-600">
                Temos uma grande variedade de veículos para você escolher, de
                diferentes fabricantes e modelos
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3>Pontualidade e agendamento</h3>
              <p className="text-gray-600">
                Nossos agendamentos e test drives sao pontuais e eficientes,
                garantindo uma experiência de compra excepcional.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3>Segurança</h3>
              <p className="text-gray-600">
                Todos os nossos veículos passam por uma rigorosa verificação
                documental e mecânica, garantindo total confiabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Modelos</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {bodyTypes.map((type) => {
              return (
                <Link
                  key={type.id}
                  href={`/cars/?type=${type.name}`}
                  className="relative group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                    <h3 className="text-white font-bold pl-4 pb-2">
                      {type.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto pra encontrar seu próximo veículo?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a diversos outros clientes satisfeitos, encontrando o
            veículo perfeito pra você na JF Veículos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cars"> Ver veículos</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Registre-se agora</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
