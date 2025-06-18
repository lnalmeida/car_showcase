/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cqshaavtqfxsjjhzulbg.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
    ],
  },
};

export default nextConfig;
