'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { deleteUser, sendEmailVerification, signOut } from 'firebase/auth'

import { env } from '@/env'
import { auth } from '@/firebase/client'

type DashboardClientProps = {
  user: {
    uid: string
    email: string
    emailVerified: boolean
  }
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut(auth)
    const response = await fetch(`${env.NEXT_PUBLIC_NED_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    router.push(env.NEXT_PUBLIC_ARYA_URL)
    setLoading(false)
  }

  const handleSendEmailVerification = async () => {
    setLoading(true)
    await sendEmailVerification(auth.currentUser!)
    alert(
      'E-mail de confirmação enviado com sucesso! Verifique sua caixa de entrada.'
    )
    setLoading(false)
  }

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      await deleteUser(auth.currentUser!)
      await fetch(`${env.NEXT_PUBLIC_NED_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      alert('Conta deletada com sucesso.')
      router.push(env.NEXT_PUBLIC_ARYA_URL)
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        alert(
          'Você precisa fazer login novamente para deletar sua conta. Por favor, faça logout e login novamente.'
        )
      } else {
        alert('Não foi possível deletar a conta. Tente novamente mais tarde.')
      }
    }
    setLoading(false)
  }

  return (
    <main>
      <h1 className="dark:text-white">{user.email}</h1>
      {user.emailVerified && (
        <h1 className="dark:text-white">E-mail verificado</h1>
      )}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 focus:outline-hidden"
      >
        Logout
      </button>
      {!user.emailVerified && (
        <button
          onClick={handleSendEmailVerification}
          disabled={loading}
          className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 focus:outline-hidden"
        >
          Enviar Confirmação de E-mail
        </button>
      )}
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded-sm hover:bg-gray-600 focus:outline-hidden"
      >
        Deletar Conta
      </button>
    </main>
  )
}
