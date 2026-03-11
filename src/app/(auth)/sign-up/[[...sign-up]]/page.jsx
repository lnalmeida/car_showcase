import React, { Suspense } from "react";
import AuthLayout from "../../AuthLayout";
import { getDealershipInfo } from "@/actions/dealership";
import CustomSignUpForm from "../_components/CustomSignUpForm";

const SignUpPage = async () => {
  const storeResponse = await getDealershipInfo();
  const storeName = storeResponse.success && storeResponse.data?.name ? storeResponse.data.name : "JF Veículos";
  const logoUrl = storeResponse.success && storeResponse.data?.logoUrl ? storeResponse.data.logoUrl : "/jf_logo.webp";

  return (
    <AuthLayout>
      <div className="p-8 rounded-2xl shadow-xl bg-white max-w-lg w-full border border-gray-100">
        <div className="flex flex-col items-center mb-8 space-y-2 text-center">
          <img
            src={logoUrl}
            alt={storeName}
            className="h-16 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Crie sua conta</h2>
            <p className="text-gray-500 text-sm">Cadastre-se para acessar o painel de {storeName}</p>
          </div>
        </div>

        <Suspense fallback={<div className="h-64 flex items-center justify-center">Carregando formulário...</div>}>
          <CustomSignUpForm storeName={storeName} />
        </Suspense>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
