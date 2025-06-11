"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Calendar, Car, Cog, LayoutDashboard, User } from "lucide-react";

import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Veículos",
    icon: Car,
    href: "/admin/vehicles",
  },
  {
    label: "Agendamentos",
    icon: Calendar,
    href: "/admin/visits",
  },
  {
    label: "Usuários",
    icon: User,
    href: "/admin/users",
  },
  {
    label: "Configurações",
    icon: Cog,
    href: "/admin/settings",
  },
];
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden mt-4 md:flex h-full flex-col overflow-y-auto bg-white shadow-sm border-r">
        {routes.map((route) => {
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-100/50 h-12",
                pathname === route.href
                  ? "text-blue-700 bg-blue-100/50 hover:bg:blue-100 hover:text-blue-700"
                  : ""
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 -z-50 bg-white border-t flex justify-around items-centerh-16">
        {routes.map((route) => {
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex flex-col items-center justify-center text-slate-500 text-xs font-medium transition-all py-1 flex-1",
                pathname === route.href ? "text-blue-700" : ""
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
