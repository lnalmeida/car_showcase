"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Edit,
  Trash2,
  FuelIcon,
  Calendar,
  Car,
  PaintRoller,
  GaugeCircle,
  Gauge,
  PaintBucket,
  Paintbrush,
  ChevronLast,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { removeVehicle, getVehicle } from "@/actions/vehicles";
import { getRelatedVehicles } from "@/actions/vehicleCatalog";
import { useRouter } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import {
  ManualTransmissions,
  MotorizationEngine,
  Whatsapp,
} from "@/assets/icons/icons";
import LeadForm from "./LeadForm";

function Overlay({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <button
        aria-label="Fechar"
        className="absolute top-4 right-4 text-white hover:text-gray-200"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </button>
      {children}
    </div>
  );
}

export default function VehicleDetail({ id }) {
  const [vehicle, setVehicle] = useState(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageOpen, setImageOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const touchStartX = useRef(null);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const relatedRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await checkUser();
      setUser(currentUser);
      if (currentUser && currentUser.role === "ADMIN") {
        setIsAdmin(true);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getVehicleData = async () => {
      if (id) {
        const result = await getVehicle(id);
        if (result.success && result.data) {
          try {
            setVehicle(result.data);
            void ("veículo: ", result.data);
          } catch (error) {
            toast.error("Ops, algo deu errado!.");
            console.error("Erro ao parsear os dados");
            setVehicle(null);
          }
        } else {
          toast.error("Erro ao buscar dados do veículo.");
          console.error("Erro ao buscar dados do veículo");
          setVehicle(null);
        }
      }
    };

    getVehicleData();
  }, [id]);

  useEffect(() => {
    const getRelatedVehiclesData = async () => {
      if (vehicle) {
        try {
          const result = await getRelatedVehicles(vehicle.typeId, vehicle.id);
          if (result.success) {
            const parsedData = result.data || [];
            setRelatedVehicles(parsedData);
          } else {
            console.error("Erro ao buscar veículos relacionados");
          }
        } catch (error) {
          toast.error("Ops, algo deu errado!.");
          console.error("Erro ao parsear os dados");
        }
      } else {
        // toast.error("Erro ao buscar dados dos veículos.");
        // console.error("❌ Erro so buscar dados dos veículos:", result.error);
      }
    };
    getRelatedVehiclesData();
  }, [vehicle]);

  const images = useMemo(
    () =>
      vehicle && vehicle.images && vehicle.images.length
        ? vehicle.images
        : [
          `https://via.placeholder.com/800x450/e2e8f0/64748b?text=${vehicle?.vehicleBrand}+${vehicle?.model}`,
        ],
    [vehicle]
  );

  const optionals = useMemo(
    () =>
      vehicle && vehicle.optinals && vehicle.optinals.length
        ? vehicle.optinals
        : [],
    [vehicle]
  );

  useEffect(() => {
    const len =
      vehicle && vehicle.images && vehicle.images.length > 0
        ? vehicle.images.length
        : 1;
    if (paused || imageOpen || len <= 1) return;
    const intervalId = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % len);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [paused, imageOpen, vehicle?.images?.length]);

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  if (vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="relative py-2 md:py-3 dotted-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-1 flex flex-col items-center justify-center py-3">
                <p className="text-2xl mt-3 font-bold text-white">
                  JFA Veículos - Seu veículo ideal está aqui!
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="text-sm text-gray-500 mb-4">
            <button
              className="hover:underline"
              onClick={() => router.back()}
            >
              Início
            </button>
            <span className="mx-2">/</span>
            <span>
              {vehicle.vehicleBrand} {vehicle.model}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div
                  className="relative aspect-video bg-gray-100"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onTouchStart={(e) =>
                    (touchStartX.current = e.touches[0].clientX)
                  }
                  onTouchEnd={(e) => {
                    if (touchStartX.current === null) return;
                    const dx =
                      e.changedTouches[0].clientX - touchStartX.current;
                    if (dx > 50) prev();
                    if (dx < -50) next();
                    touchStartX.current = null;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") prev();
                    if (e.key === "ArrowRight") next();
                  }}
                  tabIndex={0}
                  role="region"
                  aria-label="Galeria de imagens do veículo"
                >
                  <img
                    src={images[currentIndex]}
                    alt={`${vehicle.vehicleBrand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                    onClick={() => setImageOpen(true)}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        aria-label="Anterior"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                        onClick={prev}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        aria-label="Próxima"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                        onClick={next}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 rounded-full px-2 py-1">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            aria-label={`Ir para imagem ${idx + 1}`}
                            className={`h-2.5 w-2.5 rounded-full ${idx === currentIndex ? "bg-white" : "bg-white/60"
                              }`}
                            onClick={() => setCurrentIndex(idx)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {images.length > 0 && (
                  <div className="p-3 flex gap-3 overflow-x-auto">
                    {images.map((src, idx) => (
                      <button
                        key={idx}
                        className={`shrink-0 border rounded-md overflow-hidden ${idx === currentIndex ? "ring-2 ring-blue-500" : ""
                          }`}
                        onClick={() => setCurrentIndex(idx)}
                      >
                        <img
                          src={src}
                          alt={`Imagem ${idx + 1}`}
                          className="h-16 w-24 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Descrição
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {vehicle.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">
                    <Car className="mr-2" size={16} />
                    {vehicle.vehicleType}
                  </Badge>
                  <Badge variant="outline">
                    <MotorizationEngine className="mr-2 h-4 w-4 " />
                    {vehicle.engineSize}
                  </Badge>
                  <Badge variant="outline">
                    <FuelIcon className="mr-2" size={16} />
                    {vehicle.fuelType}
                  </Badge>
                  <Badge variant="outline">
                    <ManualTransmissions className="mr-2 h-4 w-4" />
                    {vehicle.transmission}
                  </Badge>
                  <Badge variant="outline">
                    <Paintbrush className="mr-2" size={16} />
                    {vehicle.color}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="mr-2" size={16} />
                    {vehicle.year}
                  </Badge>
                  <Badge variant="outline">
                    <Gauge className="mr-2" size={16} />
                    {vehicle.mileage} Km
                  </Badge>
                </div>
                {vehicle &&
                  vehicle.optionals &&
                  vehicle.optionals.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Opcionais
                      </h2>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {vehicle.optionals.map((o, index) => (
                          <Badge
                            key={index}
                            className="bg-green-200"
                            variant="outline"
                          >
                            <p className="text-gray-700 leading-relaxed">{o}</p>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {vehicle.vehicleBrand} {vehicle.model}
                </h1>
                <div className="text-gray-600 mb-4 flex items-center">
                  <Calendar className="mr-2" size={16} />
                  <p className="mr-2">{vehicle.year}</p> •
                  <MotorizationEngine className="h-5 w-5 mx-2 text-gray-500" />
                  <p>{vehicle.engineSize}</p>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  R$ {parseFloat(vehicle.price).toLocaleString("pt-BR")}
                </div>
                {vehicle.sale && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                    <p className="text-red-700 font-bold text-sm uppercase tracking-tight flex items-center gap-2">
                      <ChevronLast className="h-4 w-4" />
                      {vehicle.sale.deliveryDate
                        ? `Veículo entregue em ${new Date(vehicle.sale.deliveryDate).toLocaleDateString('pt-BR')}`
                        : `Veículo vendido em ${new Date(vehicle.sale.saleDate).toLocaleDateString('pt-BR')}`
                      }
                    </p>
                    <p className="text-xs text-red-500 mt-1">Este veículo não está mais disponível para venda.</p>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
                  {isAdmin
                    ? "Administrar veículo"
                    : "Interessado? Fale com a gente"}
                </h2>

                <div className="text-gray-600 mb-4 flex items-center"></div>

                {isAdmin ? (
                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => router.push(`/admin/vehicles/${vehicle.id}/edit`)}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => setConfirmOpen(true)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Excluir
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button
                      className="w-full py-6 bg-black hover:bg-zinc-800 text-white text-lg"
                      onClick={() => router.push(`/reservations/create?vehicleId=${vehicle.id}`)}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Agendar Visita / Test Drive
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full py-6 border-green-600 text-green-600 hover:bg-green-50 text-lg"
                      onClick={() => toast.info("Em breve: Integração com WhatsApp do Vendedor!")}
                    >
                      <Whatsapp className="!h-6 !w-6 mr-2" />
                      Fale agora com um vendedor
                    </Button>
                  </div>
                )}
              </div>
              
              {!isAdmin && (
                <LeadForm 
                  vehicleName={`${vehicle.vehicleBrand} ${vehicle.model}`} 
                  vehicleId={vehicle.id} 
                />
              )}
            </aside>
          </div>

          {/* RelatedVehicles */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Outros veículos que podem interessar
              </h2>
              {relatedVehicles.length > 0 && (
                <div className="hidden sm:flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Anterior"
                    onClick={() =>
                      relatedRef.current &&
                      relatedRef.current.scrollBy({
                        left: -(relatedRef.current?.clientWidth || 0),
                        behavior: "smooth",
                      })
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Próximo"
                    onClick={() =>
                      relatedRef.current &&
                      relatedRef.current.scrollBy({
                        left: relatedRef.current?.clientWidth || 0,
                        behavior: "smooth",
                      })
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            {relatedVehicles.length > 0 ? (
              <div className="relative">
                <div
                  ref={relatedRef}
                  className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                >
                  {relatedVehicles.map((v) => (
                    <button
                      key={v.id}
                      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden group w-56 shrink-0 text-left snap-start"
                      onClick={() => router.push(`/vehicles/${v.id}`)}
                    >
                      <div className="aspect-video bg-gay-200 relative overflow-hidden">
                        <img
                          src={
                            v.images && v.images[0]
                              ? v.images[0]
                              : `https://via.placeholder.com/400x240/e2e8f0/64748b?text=${v.vehicleBrand}+${v.model}`
                          }
                          alt={`${v.vehicleBrand} ${v.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute top-2 rigth-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/90 text-gray-700 ml-2"
                          >
                            {v.vehicleType || v.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-1">
                          {v.vehicleBrand} {v.model}
                        </h4>
                        <div className="text-sm font-bold text-blue-600 mb-2">
                          R$ {parseFloat(v.price).toLocaleString("pt-BR")}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{v.year}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="sm:hidden mt-2 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      relatedRef.current &&
                      relatedRef.current.scrollBy({
                        left: -(relatedRef.current?.clientWidth || 0),
                        behavior: "smooth",
                      })
                    }
                  >
                    Anterior <ChevronLeft className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      relatedRef.current &&
                      relatedRef.current.scrollBy({
                        left: relatedRef.current?.clientWidth || 0,
                        behavior: "smooth",
                      })
                    }
                  >
                    Próximo <ChevronLeft className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border shadow-sm p-6 text-center text-gray-600">
                Nenhum outro veículo similar encontrado.
              </div>
            )}
          </div>

          {/* End relateVehicles */}
        </div>

        <Overlay open={imageOpen} onClose={() => setImageOpen(false)}>
          <div
            className="relative max-w-5xl w-full px-6"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (dx > 50) prev();
              if (dx < -50) next();
              touchStartX.current = null;
            }}
          >
            <img
              src={images[currentIndex]}
              alt="Zoom"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            {images.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                <button
                  aria-label="Anterior"
                  className="bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  onClick={prev}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  aria-label="Próxima"
                  className="bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  onClick={next}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 rounded-full px-2 py-1">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Ir para imagem ${idx + 1}`}
                    className={`h-2.5 w-2.5 rounded-full ${idx === currentIndex ? "bg-white" : "bg-white/60"
                      }`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </Overlay>

        <Overlay open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirmar exclusão
            </h3>
            <p className="text-gray-700 mb-6">
              Tem certeza que deseja excluir este veículo? Esta ação não poderá
              ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  removeVehicle(vehicle.id);
                  setConfirmOpen(false);
                  navigate("/");
                }}
              >
                Excluir
              </Button>
            </div>
          </div>
        </Overlay>
      </div>
    );
  }

  if (vehicle === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg font-semibold animate-pulse">Carregando veículo...</p>
      </div>
    );
  }

  if (vehicle === null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-gray-900 py-3">
                  Seu veículo ideal está na JFA Veículos!
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white border rounded-lg p-8 text-center bg-gray-50/50">
            <p className="text-gray-700 text-lg mb-4">Veículo não encontrado ou não está mais disponível.</p>
            <div className="mt-4">
                <Button onClick={() => router.back()} className="bg-black hover:bg-zinc-800">Voltar</Button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
