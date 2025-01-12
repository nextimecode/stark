'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAuthContext } from '@/context/AuthContext'
import { sendSignInLink, signInWithGoogle } from '@/firebase/auth/signin'

export default function Signin() {
  const { user, loading } = useAuthContext()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!loading && user) {
      router.push('/') // Redireciona para a página inicial se o usuário já estiver autenticado
    }
  }, [loading, user, router])

  const handleGoogleLogin = async () => {
    const { success, error } = await signInWithGoogle()

    if (success) {
      router.push('/') // Redirecionar para a página inicial após o login
    } else {
      setErrorMessage(
        (error as Error)?.message || 'Falha ao fazer login com o Google.'
      )
    }
  }

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const { success, error } = await sendSignInLink(email)

    if (!success) {
      setErrorMessage(
        error === 'auth/email-already-in-use'
          ? 'Este e-mail já está vinculado a outra forma de login. Por favor, use sua senha ou outro método.'
          : (error as Error)?.message || 'Falha ao enviar o link de login.'
      )
      return
    }

    setIsLinkSent(true)
  }

  if (loading || (!loading && user)) {
    // Tela de carregamento enquanto verifica o estado de autenticação
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        {!isLinkSent ? (
          <form
            onSubmit={handleForm}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
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
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-6 text-black">Link Enviado</h1>
            <p className="text-gray-700">
              Verifique sua caixa de entrada e clique no link enviado para
              concluir o login.
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              Voltar para a página inicial
            </button>
          </div>
        )}
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
