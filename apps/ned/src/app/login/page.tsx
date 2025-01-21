// app/login

'use client'

import { useState, FormEvent } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Title } from '@/components/'

import { useAuthContext } from '@/contexts/auth-context'
import { signInWithGoogle, signInWithEmailAndPassword } from '@/firebase/auth'
import { GoogleIcon } from '@/icons'

export default function Login() {
  const router = useRouter()
  const { updateUser } = useAuthContext() // Pega o updateUser aqui
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const { success, error } = await signInWithGoogle()

    if (success) {
      router.push('/')
    } else {
      setErrorMessage(error || 'Falha ao fazer login com o Google.')
    }
    setIsLoading(false)
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const { success, error, data } = await signInWithEmailAndPassword(
      email,
      password
    )

    if (success && data?.user) {
      updateUser(data.user)
      router.push('/')
    } else {
      console.error('error', error)
      setErrorMessage(
        error === 'auth/wrong-password'
          ? 'Senha incorreta. Por favor, tente novamente.'
          : 'Falha ao fazer login. Tente novamente.'
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div>
            <div className="text-center pb-4">
              <Title color="blue" size="text-3xl">
                Conta NeXTIME
              </Title>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                Não tem conta?{' '}
                <Link
                  className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                  href="/register"
                >
                  Criar conta grátis
                </Link>
              </p>
            </div>
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleIcon />
              {isLoading ? 'Carregando...' : 'Entrar com Google'}
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
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Senha
                    </label>
                    <a
                      className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                      href="../examples/html/recover-account.html"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      placeholder="Digite a sua senha"
                      aria-describedby="password-error"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading ? 'Carregando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
