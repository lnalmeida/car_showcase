import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
      <h1 className="text-8xl font-bold gradient-title mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Página não encontrada</h2>
      <p className="text-gray-600 mb-8">
        A página que você procura não foi existe ou foi movida.
      </p>
      <Link href="/">
        <Button>Voltar para a Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
