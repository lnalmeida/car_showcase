import React from "react";

import { notFound, redirect } from "next/navigation";

import { getAdmin } from "@/actions/admin";
import { logEvent } from "@/lib/logger";

import Header from "@/components/Header";
import Sidebar from "./_components/Sidebar";
import { ClerkLoaded } from "@clerk/nextjs";

const AdminLayout = async ({ children }) => {
  const admin = await getAdmin();

  if (!admin.authorized) {
    // Usuário logado mas sem permissão de admin → redireciona para página de acesso negado
    // Usuário não logado → já é interceptado pelo middleware Clerk antes de chegar aqui
    if (admin.reason === "not-admin") {
      redirect("/unauthorized");
    }
    return notFound();
  }

  // Registra o acesso administrativo (login no painel)
  logEvent("administrative_access", { 
    path: "/admin",
    authorized: true 
  }, admin.user);

  const { getDealershipInfo } = await import("@/actions/dealership");
  const storeInfo = await getDealershipInfo();
  const logoUrl = storeInfo.success && storeInfo.data?.logoUrl ? storeInfo.data.logoUrl : null;

  return (
    <div className="h-full">
      <ClerkLoaded>
        <Header isAdminPage={true} logoUrl={logoUrl} />
      </ClerkLoaded>
      <div className="flex h-full w-56 flex-col top-24 mt-2 fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full mt-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
