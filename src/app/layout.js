import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Showcase",
  description: "A simple car showcase to improve my NextJS skills",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={`${inter.className}`}>
          <Header isAdminPage={false} />
          <main className="min-h-screen">{children}</main>
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
