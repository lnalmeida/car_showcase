const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://jfveiculospilar.com.br";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
