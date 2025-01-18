'use client'

import { useEffect, useState, FormEvent } from 'react'

import { signInWithGoogle, signInWithEmailAndPassword } from '@nextime/auth'
import { logEvent } from '@nextime/tracker'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '@/contexts/auth-context'

export default function Home() {
  const { user, loading } = useAuthContext()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!loading && user) {
      console.error('user', user)
      // router.push(`${process.env.NEXT_PUBLIC_SANSA_URL}/`)
    }
  }, [loading, user, router])

  const handleGoogleLogin = async () => {
    const { success, error } = await signInWithGoogle()

    if (success) {
      logEvent('login', { method: 'Google' })
      router.push(`${process.env.NEXT_PUBLIC_SANSA_URL}/`)
    } else {
      setErrorMessage(
        (error as Error)?.message || 'Falha ao fazer login com o Google.'
      )
    }
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { success, error } = await signInWithEmailAndPassword(email, password)

    if (success) {
      logEvent('login', { method: 'email_and_password' })
      router.push(`${process.env.NEXT_PUBLIC_SANSA_URL}/`)
    } else {
      console.error('error', error)
      setErrorMessage(
        error === 'auth/wrong-password'
          ? 'Senha incorreta. Por favor, tente novamente.'
          : error === 'auth/user-not-found'
            ? 'Usuário não encontrado. Verifique suas credenciais.'
            : error?.message || 'Falha ao fazer login. Tente novamente.'
      )
    }
  }

  if (loading || (!loading && user)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Carregando</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              onChange={e => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          {errorMessage ===
            'Este e-mail já está vinculado a outra forma de login. Por favor, use sua senha ou outro método.' && (
            <p className="text-gray-700">
              Já possui uma conta?{' '}
              <a href="/login" className="text-blue-500">
                Faça login aqui
              </a>
              .
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              Enviar Link de Login
            </button>
          </div>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded"
          >
            Login com Google
          </button>
        </div>
      </div>
    </div>
  )
}
