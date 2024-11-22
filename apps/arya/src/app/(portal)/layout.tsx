import React from 'react'

import { CookieBanner } from '../../components/CookieBanner'
import { Header } from '@/components/Header'

export default function PortalLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      {children}
      <CookieBanner />
    </div>
  )
}
