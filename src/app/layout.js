import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ptBR } from "@clerk/localizations";
import { Facebook, Instagram } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const { getDealershipInfo } = await import("@/actions/dealership");
  const storeInfo = await getDealershipInfo();

  const siteName = storeInfo.success && storeInfo.data?.name ? storeInfo.data.name : "Car Showcase";
  const siteDesc = storeInfo.success && storeInfo.data?.description ? storeInfo.data.description : "A simple car showcase to improve my NextJS skills";
  const logo = storeInfo.success && storeInfo.data?.logoUrl ? storeInfo.data.logoUrl : "/favicon.ico";

  return {
    title: siteName,
    description: siteDesc,
    icons: {
      icon: logo,
    },
  };
}

export default async function RootLayout({ children }) {
  const { getDealershipInfo } = await import("@/actions/dealership");
  const storeInfo = await getDealershipInfo();
  const logoUrl = storeInfo.success && storeInfo.data?.logoUrl ? storeInfo.data.logoUrl : null;

  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ClerkLoaded>
            <Header isAdminPage={false} logoUrl={logoUrl} />
          </ClerkLoaded>
          <main className="min-h-screen">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Toaster richColors />
          <footer className="p-12 flex bg-blue-50">
            <div className="flex space-x-8 items-center text-gray-500">
              <a
                href="http://www.instagram.com"
                target="_blank"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                <Instagram className="h-8 w-8" />
              </a>
              <a
                href="http://www.facebook.com"
                target="_blank"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                <Facebook className="h-8 w-8" />
              </a>
            </div>
            <div className="mx-auto px-4 text-center text-gray-600">
              <p>
                Criado por <strong>LNDev&#174;</strong> -{" "}
                {new Date().getFullYear()}.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
