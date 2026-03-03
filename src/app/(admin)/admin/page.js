import React from "react";
import {Dashboard} from "./_components/Dashboard";
import {getDashboardStats} from "@/actions/dashboard";
import { Info } from "lucide-react";

const AdminPage = async ({searchParams}) => {
    const {periodParams: periodParams} = await searchParams;
    const validPeriods = ["weekly", "monthly", "yearly"];
    const period = validPeriods.includes(periodParams) ? periodParams : "monthly";

    const initialData = await getDashboardStats(period);
    console.log(initialData);

    return (
      <div className="p-6">
          <div className="flex py-2 px-8 space-x-4 items-center">
              <Info className="h-8 w-8 mb-6"/>
              <h1 className="text-2xl font-bold mb-6">Painel de Informações</h1>
          </div>
          <Dashboard initialData={initialData}/>;
      </div>

    )
};
export default AdminPage;
