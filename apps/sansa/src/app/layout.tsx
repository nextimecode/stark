// app/layout.tsx

'use client'

import { ReactNode } from 'react'

import { Inter } from 'next/font/google'

import { PrelineScript } from '@/components'

import { AuthContextProvider } from '@/contexts/auth-context'

import './global.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html data-theme="dark" lang="pt-BR">
      <body className={`${inter.variable} antialiased dark`}>
        <AuthContextProvider>
          <div className="relative min-h-screen">{children}</div>
        </AuthContextProvider>
        <PrelineScript />
      </body>
    </html>
  )
}
