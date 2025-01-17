/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        pathname: '**'
      }
    ]
  },
  experimental: {
    appDir: true
  },
  transpilePackages: ['@nextime/auth']
}

module.exports = nextConfig
