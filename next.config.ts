import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hosts whose photos are resized/converted (WebP/AVIF) per screen size.
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
