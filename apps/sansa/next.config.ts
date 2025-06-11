import dotenv from 'dotenv'
import type { NextConfig } from 'next'

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  dotenv.config({ path: '.env.preview', override: true })
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
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
  // === Novo bloco para permitir seus domínios em dev ===
  allowedDevOrigins: [
    'nextime.com.br', // domínio principal
    'nextverso.com.br', // outro domínio que você usa
    '*.nextime.com.br', // se precisar de subdomínios (ex.: local.nextime.com.br)
    'local-app.nextverso.com.br',
    'localhost',
  ],
}

export default nextConfig
