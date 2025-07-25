'use client'

import { env } from '@/env'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

export default function NedLogoutPage() {
  return (
    <Suspense>
      <NedLogout />
    </Suspense>
  )
}

function NedLogout() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || env.NEXT_PUBLIC_ARYA_URL

  useEffect(() => {
    fetch('/api/logout', { method: 'POST' }).finally(() => {
      globalThis.location.replace(redirectUrl)
    })
  }, [redirectUrl])

  return <p>Saindo...</p>
}
