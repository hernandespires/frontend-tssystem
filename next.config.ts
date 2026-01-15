// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "standalone",
  
//   // ADICIONE ESTES BLOCOS:
//   typescript: {
//     // !! ATENÇÃO !!
//     // Perigo: Ignora erros de tipagem no build para produção.
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     // Ignora erros de linter durante o build
//     ignoreDuringBuilds: true,
//   },
  
//   images: {
//     remotePatterns: [{ protocol: "https", hostname: "*.googleusercontent.com" }]
//   }
// };


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // ALTERAÇÃO AQUI: Usar curinga (*) para aceitar lh3, lh4, lh5...
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      }
    ]
  }
};

export default nextConfig;