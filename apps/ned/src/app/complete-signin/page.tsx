'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { completeSignIn } from '@/firebase/auth/signIn'

export default function CompleteSignIn() {
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleSignIn = async () => {
      const { success, error } = await completeSignIn()

      if (!success) {
        setErrorMessage(
          error === 'O e-mail já está vinculado a outra forma de login.'
            ? error // Exibe mensagem específica
            : (error as Error)?.message || 'Falha ao concluir o login.'
        )
        setLoading(false)
        return
      }

      // Redireciona o usuário para a página inicial
      router.push('/')
    }

    handleSignIn()
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {loading ? (
          <h1 className="text-2xl font-bold mb-6 text-black">
            Concluindo Login...
          </h1>
        ) : errorMessage ===
          'O e-mail já está vinculado a outra forma de login.' ? (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-black">Erro</h1>
            <p className="text-red-500 mb-4">
              Este e-mail já está vinculado a outra forma de login. Por favor,
              use sua senha ou outro método para acessar sua conta.
            </p>
            <p className="text-gray-700">
              Já possui uma conta?{' '}
              <a href="/login" className="text-blue-500">
                Faça login aqui
              </a>
              .
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded mt-4"
            >
              Voltar para a página inicial
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-black">Erro</h1>
            <p className="text-red-500 mb-4">{errorMessage}</p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              Voltar para a página inicial
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
