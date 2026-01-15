import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  typescript: {
    // Ignora erros de tipagem no build para produção.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros de linter durante o build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.googleusercontent.com" }
    ]
  }
};

export default nextConfig;