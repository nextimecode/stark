import React from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import PrelineScript from '../components/PrelineScript'
import './global.css'
import '@rohan/ui/dist/index.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    template: '%s | Rohan',
    default: 'Rohan'
  },
  description: 'O amigo do motorista'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body>
        {children}
        <PrelineScript />
      </body>
    </html>
  )
}
