import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, Oxanium } from 'next/font/google'
import './global.css'

const oxanium = Oxanium({
  subsets: ['latin'],
  variable: '--font-oxanium',
  weight: ['500', '600']
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width'
}

export const metadata: Metadata = {
  description: '',
  title: {
    default: 'NeXTverso',
    template: '%s | NeXTverso'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${oxanium.variable} ${inter.variable}`}
      data-theme="dark"
      lang="pt-BR"
    >
      <body className="bg-white dark:bg-black">
        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  )
}
