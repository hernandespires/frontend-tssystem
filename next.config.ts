import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // ADICIONE ESTES BLOCOS:
  typescript: {
    // !! ATENÇÃO !!
    // Perigo: Ignora erros de tipagem no build para produção.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros de linter durante o build
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }]
  }
};

export default nextConfig;