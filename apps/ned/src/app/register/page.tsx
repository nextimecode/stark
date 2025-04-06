// app/register/page.tsx

'use client'

import { FormEvent, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Title } from '@/components'
import { Logo } from '@/components/logo'

import { env } from '@/env'
import { signUpWithEmailAndPassword, signUpWithGoogle } from '@/firebase/auth'
import { GoogleIcon } from '@/icons'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    const response = await signUpWithGoogle()

    if (response.error === null) {
      await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: response.data.uid,
          displayName: response.data.displayName,
          email: response.data.email,
          emailVerified: response.data.emailVerified,
          photoURL: response.data.photoURL,
          providerId: response.data.providerId,
          creationTime: response.data.metadata?.creationTime
        })
      })

      router.push(`${env.NEXT_PUBLIC_SANSA_URL}/`)
    } else {
      setErrorMessage(
        response.error.details || 'Falha ao se cadastrar com o Google.'
      )
    }

    setIsLoading(false)
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const response = await signUpWithEmailAndPassword(email, password)

    if (response.error === null) {
      await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: response.data.uid,
          displayName: response.data.displayName,
          email: response.data.email,
          emailVerified: response.data.emailVerified,
          photoURL: response.data.photoURL,
          providerId: response.data.providerId,
          creationTime: response.data.metadata?.creationTime
        })
      })
      router.push(`${env.NEXT_PUBLIC_SANSA_URL}/`)
    } else {
      setErrorMessage(
        response.error.code === 'auth/email-already-in-use'
          ? 'Este email já está em uso. Por favor, tente outro.'
          : response.error.details || 'Falha ao se cadastrar. Tente novamente.'
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-4xl dark:bg-system-gray6 dark:border-system-gray2 shadow-card">
        <div className="p-4 sm:p-7">
          <div>
            <div className="text-center pb-6">
              <Logo className="mx-auto" width={81} height={100} />

              <h2 className="py-4 dark:text-white text-3xl font-semibold">
                Crie sua conta,{' '}
                <Title color="blue" size="text-3xl">
                  NeXTIME
                </Title>
              </h2>
              <h3 className="text-xl font-light dark:text-white">
                Uma só conta para todos os produtos.{' '}
                <span className="font-semibold">É grátis!</span>
              </h3>
              <p className="mt-2 text-md text-gray-600 dark:text-white">
                Já tem conta?{' '}
                <Link
                  className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                  href="/"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-system-gray-transparent dark:border-system-gray2 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <GoogleIcon />
              {isLoading ? 'Carregando...' : 'Cadastrar com Google'}
            </button>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Ou
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Informe o seu e-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-system-gray-transparent dark:border-system-gray2 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      placeholder="Ex: @gmail, @outlook, @yahoo, etc."
                      aria-describedby="email-error"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-system-gray-transparent dark:border-system-gray2 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      placeholder="Digite uma senha forte"
                      aria-describedby="password-error"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading ? 'Carregando...' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
