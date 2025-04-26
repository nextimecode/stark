import { ReactNode } from 'react'

import { CookieBanner } from '@/components-test/cookie-banner'
import { Header } from '@/components-test/header'

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <CookieBanner />
    </div>
  )
}
