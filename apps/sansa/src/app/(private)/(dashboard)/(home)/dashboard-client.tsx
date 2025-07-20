'use client'

import { deleteUser, sendEmailVerification, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { env } from '@/env'
import { auth } from '@/firebase/client'
import { Button } from '@nextime/ui'

interface DashboardClientProps {
  user: {
    email: string
    emailVerified: boolean
    uid: string
  }
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async (): Promise<void> => {
    setLoading(true)

    try {
      await signOut(auth)
      await fetch(`${env.NEXT_PUBLIC_NED_URL}/api/logout`, {
        credentials: 'include',
        method: 'POST'
      })
      router.push(
        `${env.NEXT_PUBLIC_NED_URL}/logout?redirect=${encodeURIComponent(env.NEXT_PUBLIC_ARYA_URL)}`
      )
    } catch (error) {
      console.error('Erro no logout:', error)
      alert('Não foi possível deslogar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmailVerification = async (): Promise<void> => {
    setLoading(true)
    const currentUser = auth.currentUser

    if (!currentUser) {
      alert('Usuário não autenticado.')
      setLoading(false)
      return
    }

    try {
      await sendEmailVerification(currentUser)
      alert(
        'E-mail de confirmação enviado com sucesso! Verifique sua caixa de entrada.'
      )
    } catch (error) {
      console.error('Erro ao enviar confirmação de e-mail:', error)
      alert('Falha ao enviar e-mail de confirmação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async (): Promise<void> => {
    setLoading(true)
    const currentUser = auth.currentUser

    if (!currentUser) {
      alert('Usuário não autenticado.')
      setLoading(false)
      return
    }

    try {
      await deleteUser(currentUser)
      await fetch(`${env.NEXT_PUBLIC_NED_URL}/api/delete-account`, {
        credentials: 'include',
        method: 'POST'
      })
      alert('Conta deletada com sucesso.')
      router.push(env.NEXT_PUBLIC_ARYA_URL)
    } catch (error) {
      console.error('Erro ao deletar conta:', error)

      if (isAuthError(error) && error.code === 'auth/requires-recent-login') {
        alert(
          'Você precisa fazer login novamente para deletar sua conta. Por favor, faça logout e login novamente.'
        )
      } else {
        alert('Não foi possível deletar a conta. Tente novamente mais tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1 className="dark:text-white">{user.email}</h1>
      {user.emailVerified && (
        <h1 className="dark:text-white">E-mail verificado</h1>
      )}

      <Button
        className="mt-4"
        disabled={loading}
        type="button"
        onClick={handleLogout}
      >
        Logout (UI)
      </Button>

      <button
        className="mt-4 rounded-sm bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-hidden"
        disabled={loading}
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>

      {!user.emailVerified && (
        <button
          className="mt-4 ml-4 rounded-sm bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-hidden"
          disabled={loading}
          type="button"
          onClick={handleSendEmailVerification}
        >
          Enviar Confirmação de E-mail
        </button>
      )}

      <button
        className="mt-4 ml-4 rounded-sm bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-hidden"
        disabled={loading}
        type="button"
        onClick={handleDeleteAccount}
      >
        Deletar Conta
      </button>
    </main>
  )
}

// Type‐guard para erros de autenticação do Firebase
function isAuthError(error: unknown): error is { code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
  )
}
