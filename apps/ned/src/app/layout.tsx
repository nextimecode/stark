// 'use client'
// export const dynamic = 'force-dynamic'
import { ReactNode } from 'react'

// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import PrelineScript from '@/components/PrelineScript'

import { AuthContextProvider } from '@/contexts/auth-context'

import './globals.css'

// Load the Inter font with 'latin' subset
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Entrar',
//     default: 'NeXTIME | Entrar'
//   },
//   description: ''
// }

// Root layout component for the application
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body className="bg-gray-100 dark:bg-neutral-800">
        <AuthContextProvider>
          <div className="relative min-h-screen">{children}</div>
        </AuthContextProvider>
        <PrelineScript />
      </body>
    </html>
  )
}
