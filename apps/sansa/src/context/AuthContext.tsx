'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'

import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

import { firebase_app } from '@/firebase/config'

// Inicializa a instância de autenticação do Firebase
const auth = getAuth(firebase_app)

// Cria o contexto de autenticação
interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para acessar o contexto de autenticação
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(
      'useAuthContext deve ser usado dentro de AuthContextProvider'
    )
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
    // Assina as mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser || null) // Atualiza o estado do usuário
      setLoading(false) // Define loading como falso quando o estado é resolvido
    })

    // Desassina as mudanças no estado de autenticação ao desmontar
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
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
