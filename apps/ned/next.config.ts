import type { NextConfig } from 'next'

import dotenv from 'dotenv'

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  dotenv.config({ path: '.env.preview', override: true })
}

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig
