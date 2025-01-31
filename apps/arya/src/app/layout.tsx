import { ReactNode } from 'react'

import type { Viewport } from 'next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { PrelineScript } from '../components/PrelineScript'
import './global.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false
}

export const metadata: Metadata = {
  title: {
    template: '%s | NeXTverso',
    default: 'NeXTverso'
  },
  description: ''
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html data-theme="dark" lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <div className="relative min-h-screen">{children}</div>
        <PrelineScript />
      </body>
    </html>
  )
}
