import React from "react";

import { notFound } from "next/navigation";

import { getAdmin } from "@/actions/admin";

import Header from "@/components/Header";
import Sidebar from "./_components/Sidebar";

const AdminLayout = async ({ children }) => {
  const admin = await getAdmin();

  if (!admin.authorized) {
    return notFound();
  }

  return (
    <div className="h-full">
      <Header isAdminPage={true} />
      <div className="flex h-full w-56 flex-col top-24 mt-2 fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full mt-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
