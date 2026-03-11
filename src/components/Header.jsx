
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

const Header = async ({ isAdminPage = false, logoUrl = null }) => {
  const user = await checkUser();

  const isAdmin = user?.role === "ADMIN";

  // isAdminPage = isAdminPage || isAdmin;
  {
    void ("isAdminPage", isAdminPage);
  }
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"}>
          <div className="relative h-12 w-32 sm:h-14 sm:w-40">
            <Image
              src={logoUrl || "/jf_logo.webp"}
              alt="Brand Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
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
