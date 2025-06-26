import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Showcase",
  description: "A simple car showcase to improve my NextJS skills",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ClerkLoaded>
            <Header isAdminPage={false} />
          </ClerkLoaded>
          <main className="min-h-screen">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Toaster richColors />
          <footer className="p-12 bg-blue-50">
            <div className="container mx-auto px-4 text-center text-gray-600">
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
