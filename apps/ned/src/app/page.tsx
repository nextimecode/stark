'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { sendEmailVerification, signOut, deleteUser } from 'firebase/auth'

import { useAuthContext } from '@/contexts/auth-context'
import { auth } from '@/firebase/config'

export default function Home() {
  const { user, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user == null) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const handleSendEmailVerification = async () => {
    if (!user) return

    try {
      await sendEmailVerification(user)
      alert(
        'E-mail de confirmação enviado com sucesso! Verifique sua caixa de entrada.'
      )
    } catch (error) {
      console.error('Erro ao enviar o e-mail de confirmação:', error)
      alert(
        'Não foi possível enviar o e-mail de confirmação. Tente novamente mais tarde.'
      )
    }
  }

  const handleDeleteAccount = async () => {
    if (!user) return

    try {
      await deleteUser(user)
      alert('Conta deletada com sucesso.')
      router.push('/login')
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        alert(
          'Você precisa fazer login novamente para deletar sua conta. Por favor, faça logout e login novamente.'
        )
      } else {
        console.error('Erro ao deletar conta:', error)
        alert('Não foi possível deletar a conta. Tente novamente mais tarde.')
      }
    }
  }

  if (loading || user == null) {
    return <p>Carregando...</p>
  }

  return (
    <main>
      <h1>{user.email}</h1>
      <div>{user.emailVerified && <h1>E-mail verificado</h1>}</div>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
      <button
        onClick={handleSendEmailVerification}
        className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Enviar Confirmação de E-mail
      </button>
      <button
        onClick={handleDeleteAccount}
        className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
      >
        Deletar Conta
      </button>
    </main>
  )
}
