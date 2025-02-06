import React, { ReactNode } from 'react'

import { CookieBanner } from '../../components/CookieBanner'
import { Header } from '@/components/Header'

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <CookieBanner />
    </div>
  )
}
