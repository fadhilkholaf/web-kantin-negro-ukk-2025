import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "**.cloudinary.com",
      },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: "100mb" } },
};

export default nextConfig;
