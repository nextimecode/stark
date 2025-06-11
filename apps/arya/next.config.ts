import dotenv from 'dotenv'
import type { NextConfig } from 'next'

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  dotenv.config({ path: '.env.preview', override: true })
}

const nextConfig: NextConfig = {
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
    '*.nextime.com.br', // se precisar de subdomínios (ex.: local.nextime.com.br)
    'nextverso.com.br', // outro domínio que você usa
    '*.nextverso.com.br',
  ],
}

export default nextConfig
