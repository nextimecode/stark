import dotenv from 'dotenv';
import type { NextConfig } from 'next';

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  dotenv.config({ override: true, path: '.env.preview' });
}

const nextConfig: NextConfig = {
  // === Novo bloco para permitir seus domínios em dev ===
  allowedDevOrigins: [
    'nextime.com.br', // domínio principal
    'nextverso.com.br', // outro domínio que você usa
    '*.nextime.com.br', // se precisar de subdomínios (ex.: local.nextime.com.br)
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
};

export default nextConfig;
