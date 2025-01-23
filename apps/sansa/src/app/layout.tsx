// app/layout.tsx

'use client'

import { ReactNode } from 'react'

import { Inter } from 'next/font/google'

import { PrelineScript } from '@/components'

import { AuthContextProvider } from '@/contexts/auth-context'

import './global'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

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
