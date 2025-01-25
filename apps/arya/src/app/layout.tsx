import { ReactNode } from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { PrelineScript } from '../components/PrelineScript'
import './global.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    template: '%s | stark',
    default: 'stark'
  },
  description: ''
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={'dark'} lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <div className="relative min-h-screen">{children}</div>
        <PrelineScript />
      </body>
    </html>
  )
}
