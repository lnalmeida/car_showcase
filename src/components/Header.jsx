import React from "react";
import Link from "next/link";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import { is } from "../../.next/static/chunks/[root of the server]__31723f._";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();

  const isAdmin = user?.role === "ADMIN";

  // isAdminPage = isAdminPage || isAdmin;
  {
    console.log("isAdminPage", isAdminPage);
  }
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"}>
          <Image
            src="/jf_veiculos_logo_resized.png"
            alt="logo"
            width={40000}
            height={120}
            className="h-12 w-auto object-contain"
          />
          {isAdminPage && (
            <span className="text-xs font-extralight">Admin</span>
          )}
        </Link>

        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                <span className="hidden md:inline">Voltar ao aplicativo</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href="/saved-cars">
                <Button>
                  <Heart size={18} />
                  <span className="hidden md:inline">Meus carros</span>
                </Button>
              </Link>

              <Link href={isAdmin ? "/admin" : "/reservations"}>
                <Button variant="outline">
                  {isAdmin ? <Layout size={18} /> : <CarFront size={18} />}
                  <span className="hidden md:inline">
                    {isAdmin ? "Administração" : "Minhas reservas"}
                  </span>
                </Button>
              </Link>
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Entrar</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
