"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldX, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds === 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router]);

  // Progresso do anel — de 0% a 100% conforme o countdown aumenta
  const progress = ((5 - seconds) / 5) * 100;
  const circumference = 2 * Math.PI * 28; // raio = 28
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Ícone animado */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Anel de progresso do countdown */}
        <svg
          className="absolute rotate-[-90deg]"
          width="80"
          height="80"
          viewBox="0 0 64 64"
        >
          {/* Trilha cinza */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="4"
          />
          {/* Arco de progresso azul */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Fundo do ícone */}
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center border-2 border-red-100">
          <ShieldX className="w-8 h-8 text-red-500" strokeWidth={1.5} />
        </div>
      </div>

      {/* Título */}
      <h1 className="text-5xl font-bold gradient-title mb-3">401</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mb-3">
        Acesso Restrito
      </h2>
      <p className="text-slate-500 max-w-md mb-2 leading-relaxed">
        Você não tem permissão para acessar a área administrativa.
        Esta seção é exclusiva para administradores do sistema.
      </p>

      {/* Countdown */}
      <p className="text-sm text-slate-400 mb-8">
        Redirecionando para a página inicial em{" "}
        <span className="font-semibold text-blue-600 tabular-nums">
          {seconds}
        </span>{" "}
        {seconds === 1 ? "segundo" : "segundos"}...
      </p>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/">
            <Home size={16} />
            Ir para Home agora
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="gap-2 text-slate-500 hover:text-slate-700"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Voltar
        </Button>
      </div>
    </div>
  );
}
