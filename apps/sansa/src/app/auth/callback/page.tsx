'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthCallback() {
  const router = useRouter()
  const [sessionCookie, setSessionCookie] = useState<string | null>(null)
  const [setCookieStatus, setSetCookieStatus] =
    useState<string>('Aguardando...')

  useEffect(() => {
    const url = new URL(window.location.href)
    const cookie = url.searchParams.get('sessionCookie')
    setSessionCookie(cookie)
    console.log('[Sansa AuthCallback] sessionCookie:', cookie)
    if (!cookie) {
      setSetCookieStatus('Session cookie não encontrado na URL')
      console.log('[Sansa AuthCallback] Session cookie não encontrado na URL')
      router.replace('/login')
      return
    }

    fetch('/api/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: cookie }),
      credentials: 'include',
    })
      .then(res => {
        setSetCookieStatus('Status do set-cookie: ' + res.status)
        console.log('[Sansa AuthCallback] /api/set-cookie status:', res.status)
        return res.json()
      })
      .then(json => {
        console.log('[Sansa AuthCallback] /api/set-cookie response:', json)
        if (json.success) {
          console.log(
            '[Sansa AuthCallback] Cookie set com sucesso, redirecionando para /'
          )
          router.replace('/')
        } else {
          setSetCookieStatus('Erro ao definir cookie: ' + JSON.stringify(json))
          console.error('[Sansa AuthCallback] Erro ao definir cookie:', json)
        }
      })
      .catch(err => {
        setSetCookieStatus('Erro ao chamar /api/set-cookie: ' + err)
        console.error(
          '[Sansa AuthCallback] Erro ao chamar /api/set-cookie:',
          err
        )
      })
  }, [router])

  return (
    <div style={{ padding: 32 }}>
      <h1>Autenticando...</h1>
      <p>
        <b>Session Cookie:</b> <code>{sessionCookie}</code>
      </p>
      <p>
        <b>Status do set-cookie:</b> {setCookieStatus}
      </p>
      <p>Veja o console para mais detalhes.</p>
    </div>
  )
}
