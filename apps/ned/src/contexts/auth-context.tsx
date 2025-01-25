'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'

import { auth, onAuthStateChanged, User } from '@/firebase/config'

interface AuthContextType {
  user: User | null
  loading: boolean
  updateUser: (firebaseUser: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.error('useAuthContext deve ser usado dentro de AuthContextProvider')
    return {
      user: null,
      loading: true,
      updateUser: () => {
        console.error('updateUser chamado fora do contexto')
      }
    }
  }
  return context
}

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser || null)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const updateUser = (firebaseUser: User | null) => {
    setUser(firebaseUser)
  }

  return (
    <AuthContext.Provider value={{ user, loading, updateUser }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p>Carregando...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
