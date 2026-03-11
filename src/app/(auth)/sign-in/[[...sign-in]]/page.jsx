import React from "react";
import AuthLayout from "../../AuthLayout";
import { getDealershipInfo } from "@/actions/dealership";
import CustomSignInForm from "../_components/CustomSignInForm";

const SignInPage = async () => {
  const storeResponse = await getDealershipInfo();
  const storeName = storeResponse.success && storeResponse.data?.name ? storeResponse.data.name : "JF Veículos";
  const logoUrl = storeResponse.success && storeResponse.data?.logoUrl ? storeResponse.data.logoUrl : "/jf_logo.webp";

  return (
    <AuthLayout>
      <div className="p-8 rounded-2xl shadow-xl bg-white max-w-md w-full border border-gray-100">
        <div className="flex flex-col items-center mb-8 space-y-2 text-center">
          <img
            src={logoUrl}
            alt={storeName}
            className="h-16 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Acesse sua conta</h2>
            <p className="text-gray-500 text-sm">Bem-vindo de volta à {storeName}</p>
          </div>
        </div>

        <CustomSignInForm storeName={storeName} />
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
