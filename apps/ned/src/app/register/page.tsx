// app/register/page.tsx

'use client'

import { type FormEvent, Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Logo, Spinner, Title } from '@/components'
import type { UserRegisterBodySchema } from '@/app/api/register-user/route'
import { env } from '@/env'
import {
  type FirebaseUser,
  signUpWithEmailAndPassword,
  signUpWithGoogle
} from '@/firebase/auth'
import { GoogleIcon } from '@/icons'

export default function RegisterPage() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  )
}

function Register() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || env.NEXT_PUBLIC_SANSA_URL

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]
    console.log(
      '[Register] useEffect: token',
      token,
      'redirectUrl',
      redirectUrl
    )

    if (token) {
      console.log(
        '[Register] Usuário já autenticado, redirecionando para:',
        redirectUrl
      )
      globalThis.location.replace(redirectUrl)
    }
  }, [redirectUrl])

  const registerUserOnBackend = async (user: FirebaseUser) => {
    try {
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
      console.log('[Register] registerUserOnBackend: userPayload', userPayload)
      const registerRes = await fetch('/api/register-user', {
        body: JSON.stringify(userPayload),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      })
      console.log('[Register] /api/register-user status:', registerRes.status)

      if (!registerRes.ok) {
        throw new Error('Erro ao registrar usuário.')
      }

      const idToken = await user.getIdToken()
      console.log('[Register] idToken:', idToken)
      const sessionRes = await fetch('/api/create-session-cookie', {
        body: JSON.stringify({ idToken }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      })
      console.log(
        '[Register] /api/create-session-cookie status:',
        sessionRes.status
      )
      const { sessionCookie } = await sessionRes.json()

      if (!sessionCookie) {
        setErrorMessage('Erro ao criar session cookie.')
        return
      }
      console.log('[Register] sessionCookie:', sessionCookie)

      const setCookieRes = await fetch('/api/set-cookie', {
        body: JSON.stringify({ token: sessionCookie }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      })
      console.log('[Register] /api/set-cookie status:', setCookieRes.status)

      if (!setCookieRes.ok) {
        setErrorMessage('Erro ao definir cookie de autenticação')
        return
      }

      // Usa apenas o parâmetro de URL para redirecionar
      const callbackUrl = `${redirectUrl}/auth/callback?sessionCookie=${encodeURIComponent(sessionCookie)}`
      console.log('[Register] Redirecionando para:', callbackUrl)
      setTimeout(() => {
        globalThis.location.replace(callbackUrl)
      }, 100)
    } catch (error) {
      console.error('[Register] Erro no fluxo de autenticação:', error)
      setErrorMessage('Erro ao autenticar. Por favor, tente novamente.')
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    const response = await signUpWithGoogle()

    if (response.error) {
      setErrorMessage(
        response.error.details || 'Falha ao se cadastrar com o Google.'
      )
    } else {
      await registerUserOnBackend(response.data)
    }
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const response = await signUpWithEmailAndPassword(email, password)

    if (response.error) {
      setErrorMessage(
        response.error.code === 'auth/email-already-in-use'
          ? 'Este email já está em uso. Por favor, tente outro.'
          : response.error.details || 'Falha ao se cadastrar. Tente novamente.'
      )
    } else {
      await registerUserOnBackend(response.data)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70">
          <Spinner size="xl" />
        </div>
      )}

      <div className="dark:bg-system-gray6 dark:border-system-gray2 shadow-card w-full max-w-xl rounded-4xl border border-gray-200 bg-white">
        <div className="p-4 sm:p-7">
          <div className="pb-6 text-center">
            <Logo className="mx-auto" width={81} height={100} />
            <h2 className="py-4 text-3xl font-semibold dark:text-white">
              Crie sua conta,{' '}
              <Title size="text-3xl" color="blue">
                NeXTIME
              </Title>
            </h2>
            <h3 className="text-xl font-light dark:text-white">
              Uma só conta para todos os produtos.{' '}
              <span className="font-semibold">É grátis!</span>
            </h3>
            <p className="text-md mt-2 text-gray-600 dark:text-white">
              Já tem conta?{' '}
              <Link
                href="/"
                className="font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
              >
                Faça login aqui
              </Link>
            </p>
          </div>

          <button
            className="dark:bg-system-gray-transparent dark:border-system-gray2 inline-flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            disabled={isLoading}
            type="button"
            onClick={handleGoogleSignUp}
          >
            <GoogleIcon />
            Cadastrar com Google
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

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

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
                  placeholder="Digite uma senha forte"
                />
              </div>

              <button
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                disabled={isLoading}
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
