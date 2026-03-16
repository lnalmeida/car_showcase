"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Opcional: Logar o erro em um serviço de monitoramento
    console.error("Erro capturado pela Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Ops! Algo deu errado</h1>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Estamos com dificuldades temporárias para conectar ao nosso banco de dados. 
        Tente atualizar a página ou volte em alguns instantes.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={() => reset()} 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar Novamente
        </Button>
        
        <Button variant="outline" asChild>
          <Link href="/">Voltar para o Início</Link>
        </Button>
      </div>

      <div className="mt-12 text-sm text-gray-400">
        <p>Código do erro: {error.digest || 'Erro de Conexão'}</p>
      </div>
    </div>
  );
}
