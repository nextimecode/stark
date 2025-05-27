'use client'

import { env } from '@/env'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function NedLogout() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || env.NEXT_PUBLIC_ARYA_URL

  useEffect(() => {
    fetch('/api/logout', { method: 'POST' }).finally(() => {
      window.location.replace(redirectUrl)
    })
  }, [redirectUrl])

  return <p>Saindo...</p>
} 
