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
  let logo = "/favicon.ico";
  if (storeInfo.success && storeInfo.data?.logoUrl) {
    logo = storeInfo.data.logoUrl;
    if (logo.includes("res.cloudinary.com") && logo.includes("/upload/")) {
      // Formata a imagem para favicon: 64x64, cortando/ampliando conforme necessário (c_fill) em PNG.
      logo = logo.replace("/upload/", "/upload/w_64,h_64,c_fill,f_png/");
    }
  }
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://car-showcase-peach-xi.vercel.app";
  const ogImage = storeInfo.success && storeInfo.data?.logoUrl ? storeInfo.data.logoUrl : `${siteUrl}/jf_logo.webp`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDesc,
    icons: {
      icon: logo,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: siteUrl,
      siteName: siteName,
      title: siteName,
      description: siteDesc,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDesc,
      images: [ogImage],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

import Footer from "@/components/Footer";

export default async function RootLayout({ children }) {
  const { getDealershipInfo } = await import("@/actions/dealership");
  const storeInfo = await getDealershipInfo();
  const logoUrl = storeInfo.success && storeInfo.data?.logoUrl ? storeInfo.data.logoUrl : null;

  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ClerkLoaded>
            <Header isAdminPage={false} logoUrl={logoUrl || "/jf_logo.webp"} />
          </ClerkLoaded>
          <main className="min-h-screen">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Toaster richColors />
          <Footer storeInfo={storeInfo} />
        </body>
      </html>
    </ClerkProvider>
  );
}
