import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.freepik.com"], // Add the external domain you want to allow
  },
  // You can add other config options here if needed
};

export default nextConfig;
