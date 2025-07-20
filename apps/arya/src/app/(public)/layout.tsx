import type { ReactNode } from 'react'
import { CookieBanner } from '@/components/cookie-banner'
import { Header } from '@/components/header'

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <CookieBanner />
    </div>
  )
}
