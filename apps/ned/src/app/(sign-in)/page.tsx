// app/(sign-in)/page.tsx

'use client'

import type { UserRegisterBodySchema } from '@/app/api/register-user/route'
import { Title } from '@/components'
import { Logo } from '@/components/logo'
import { Spinner } from '@/components/ui/spinner'
import { env } from '@/env'
import {
  type FirebaseUser,
  signInWithEmailAndPassword,
  signInWithGoogle
} from '@/firebase/auth'
import { GoogleIcon } from '@/icons'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type FormEvent, Suspense, useEffect, useState } from 'react'

export default function SignInPage() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  )
}

function SignIn() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || env.NEXT_PUBLIC_SANSA_URL
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]

    if (token) {
      globalThis.location.replace(redirectUrl)
    }
  }, [redirectUrl])

  const registerUserOnBackend = async (user: FirebaseUser) => {
    const userPayload: UserRegisterBodySchema = {
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      emailVerified: user.emailVerified,
      firebaseId: user.uid,
      firebaseMetadata: {
        creationTime: user.metadata?.creationTime ?? '',
        lastSignInTime: user.metadata?.lastSignInTime ?? ''
      },
      phoneNumber: user.phoneNumber ?? '',
      photoURL: user.photoURL ?? '',
      providerId: user.providerData[0].providerId
    }

    await fetch('/api/register-user', {
      body: JSON.stringify(userPayload),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })

    const idToken = await user.getIdToken()
    const sessionRes = await fetch('/api/create-session-cookie', {
      body: JSON.stringify({ idToken }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })
    const { sessionCookie } = await sessionRes.json()

    await fetch('/api/set-cookie', {
      body: JSON.stringify({ token: sessionCookie }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })

    const callbackUrl = `${redirectUrl}/auth/callback?sessionCookie=${encodeURIComponent(sessionCookie)}`
    globalThis.location.replace(callbackUrl)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      const response = await signInWithGoogle()

      if (!response.error) {
        await registerUserOnBackend(response.data)
      }
    } catch (error) {
      console.error('[SignIn] Erro no login com Google:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await signInWithEmailAndPassword(email, password)

      if (!response.error) {
        await registerUserOnBackend(response.data)
      }
    } catch (error) {
      console.error('[SignIn] Erro no login com email/senha:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70">
          <Spinner size="xl" />
        </div>
      )}

      <div className="shadow-card dark:bg-system-gray6 dark:border-system-gray2 w-full max-w-xl rounded-4xl border border-gray-200 bg-white">
        <div className="p-7">
          <div className="pb-6 text-center">
            <Logo className="mx-auto" width={81} height={100} />
            <h2 className="py-4 text-2xl font-semibold text-white">
              Inicie sessão com a Conta{' '}
              <Title size="text-3xl" color="blue">
                NeXTIME
              </Title>
            </h2>
          </div>

          <button
            className="dark:bg-system-gray-transparent dark:border-system-gray2 inline-flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            disabled={isLoading}
            type="button"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Entrar com Google
          </button>

          <div className="flex items-center py-3 text-xs text-gray-400 uppercase before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
            Ou
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label
                  className="mb-2 block text-sm dark:text-white"
                  htmlFor="email"
                >
                  Informe o seu e-mail
                </label>
                <input
                  className="dark:bg-system-gray-transparent dark:border-system-gray2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Ex: @gmail, @outlook, @yahoo, etc."
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm dark:text-white"
                  htmlFor="password"
                >
                  Senha
                </label>
                <input
                  className="dark:bg-system-gray-transparent dark:border-system-gray2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Digite a sua senha"
                />
              </div>
            </div>

            <div className="mt-5 mb-6">
              <button
                className="inline-flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                disabled={isLoading}
                type="submit"
              >
                Entrar
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 md:gap-2">
              <Link
                href="/recover"
                className="inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
              >
                Esqueceu sua senha?
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
              >
                Criar conta NeXTIME
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
