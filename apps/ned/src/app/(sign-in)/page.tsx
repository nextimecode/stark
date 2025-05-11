'use client'

import { type FormEvent, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Title } from '@/components'
import { Logo } from '@/components/logo'
import { Spinner } from '@/components/ui/spinner'

import { signInWithEmailAndPassword, signInWithGoogle } from '@/firebase/auth'
import { GoogleIcon } from '@/icons'

export default function SignIn() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const registerUserOnBackend = async (user: any) => {
    await fetch('/api/register-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        providerId: user.providerId
      }),
    })

    const token = await user.getIdToken()

    const res = await fetch('/api/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })

    if (res.ok) {
      router.push('/')
    } else {
      setErrorMessage('Erro ao configurar o cookie de sessão.')
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    const response = await signInWithGoogle()

    if (response.error === null) {
      await registerUserOnBackend(response.data)
    } else {
      setErrorMessage(
        response.error.details || 'Falha ao fazer login com o Google.'
      )
    }

    setIsLoading(false)
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const response = await signInWithEmailAndPassword(email, password)

    if (response.error === null) {
      await registerUserOnBackend(response.data)
    } else {
      setErrorMessage(
        response.error.code === 'auth/wrong-password'
          ? 'Senha incorreta. Por favor, tente novamente.'
          : response.error.details || 'Falha ao fazer login. Tente novamente.'
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white/70 dark:bg-black/70 flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      )}

      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-4xl shadow-card dark:bg-system-gray6 dark:border-system-gray2">
        <div className="p-7">
          <div className="text-center pb-6">
            <Logo className="mx-auto" width={81} height={100} />
            <h2 className="py-4 text-white text-2xl font-semibold">
              Inicie sessão com a Conta{' '}
              <Title color="blue" size="text-3xl">
                NeXTIME
              </Title>
            </h2>
          </div>

          <button
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg cursor-pointer border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-system-gray-transparent dark:border-system-gray2 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <GoogleIcon />
            Entrar com Google
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
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-system-gray-transparent dark:border-system-gray2 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required
                  placeholder="Ex: @gmail, @outlook, @yahoo, etc."
                  onChange={e => setEmail(e.target.value)}
                />
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
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-system-gray-transparent dark:border-system-gray2 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required
                  placeholder="Digite a sua senha"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 mb-6">
              <button
                type="submit"
                className="w-full cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={isLoading}
              >
                Entrar
              </button>
            </div>

            <div className="flex items-center flex-col gap-4 md:gap-2">
              <Link
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                href="/recover"
              >
                Esqueceu sua senha?
              </Link>
              <Link
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                href="/register"
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
