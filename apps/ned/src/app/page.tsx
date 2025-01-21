'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { signOut } from 'firebase/auth'

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

  if (loading || user == null) {
    return <p>Carregando...</p>
  }

  return (
    <main>
      <h1>{user.email}</h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
    </main>
  )
}
