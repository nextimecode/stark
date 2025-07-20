import '../../global.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Untitled UI'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="lg:grid-cols-app relative min-h-screen lg:grid dark:bg-zinc-900">
          <Sidebar />

          <main className="max-w-screen px-4 pt-24 pb-12 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
