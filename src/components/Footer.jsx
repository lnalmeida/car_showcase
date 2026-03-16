"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight,
  Instagram,
  Facebook,
  MessageCircle,
  Music2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = ({ storeInfo }) => {
  const {
    name = "JF Veículos",
    address = "Av. Leonel de Moura Brizola, nº 1990, Pilar, Duque de Caxias, RJ",
    phone = "+55 21 98217-4174",
    email = "contato@jfveiculospillar.com.br",
    description = "Sua concessionária de confiança em Duque de Caxias.",
    logoUrl,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    socialMedia
  } = storeInfo?.data || {};

  const currentYear = new Date().getFullYear();

  // Função para formatar o telefone (Máscara frontend)
  const formatPhone = (val) => {
    if (!val) return "";
    const numbers = val.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }
  };

  const formattedPhone = formatPhone(phone);

  // Link para WhatsApp (limpando caracteres não numéricos)
  const whatsappNumber = phone.replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // Encode do endereço para o Google Maps
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&q=${encodeURIComponent(address)}`;
  
  // Como não temos a API Key configurada necessariamente no lado do cliente via env de forma padrão para Iframe sem custo, 
  // usaremos o link embed clássico por enquanto ou uma versão sem key se possível.
  // Alternativa segura sem API Key para Embed simples:
  const simpleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Coluna 1: Marca e Descrição */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              {logoUrl ? (
                <Image 
                  src={logoUrl} 
                  alt={name} 
                  width={150} 
                  height={50} 
                  className="h-10 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {name}
                </span>
              )}
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
              {description}
            </p>
            <div className="flex space-x-4">
              {instagramUrl && (
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Instagram size={20} />
                </a>
              )}
              {facebookUrl && (
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Facebook size={20} />
                </a>
              )}
              {tiktokUrl && (
                <a 
                  href={tiktokUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Music2 size={20} />
                </a>
              )}
              {!instagramUrl && !facebookUrl && !tiktokUrl && socialMedia && (
                <a 
                  href={socialMedia} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Coluna 2: Sitemap */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-slate-900 dark:text-white font-semibold text-lg">Mapa do Site</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors flex items-center group text-sm">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                  Início
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors flex items-center group text-sm">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                  Veículos em Estoque
                </Link>
              </li>
              <li>
                <Link href="/saved-cars" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors flex items-center group text-sm">
                  <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                  Meus Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Suporte & Admin */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-slate-900 dark:text-white font-semibold text-lg">Suporte</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors flex items-center group text-sm">
                  Privacidade & Termos
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors flex items-center group text-sm">
                  Acesso Restrito (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Localização */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-slate-900 dark:text-white font-semibold text-lg">Localização</h3>
            
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 h-32 w-full relative">
              <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={simpleMapUrl}
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="mr-3 text-blue-600 shrink-0" size={18} />
                <span>{address}</span>
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Phone className="mr-3 text-blue-600 shrink-0" size={18} />
                <span>{formattedPhone}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white w-full shadow-lg shadow-green-100 dark:shadow-none transition-all hover:scale-105 active:scale-95">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <MessageCircle className="mr-2" size={18} />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full border-blue-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-900 transition-all hover:scale-105 active:scale-95">
                <a href={`mailto:${email}`} className="flex items-center justify-center">
                  <Mail className="mr-2 text-blue-600" size={18} />
                  E-mail
                </a>
              </Button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 dark:text-slate-500 text-xs">
            © {currentYear} <span className="font-bold text-slate-600 dark:text-slate-400">{name}</span>. Todos os direitos reservados.
          </p>
          <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
            Desenvolvido por <span className="font-bold ml-1 text-blue-600/80">LNDev®</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
