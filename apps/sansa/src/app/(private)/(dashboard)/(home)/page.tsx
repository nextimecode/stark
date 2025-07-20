// app/(dashboard)/page.tsx

import { adminAuth } from '@/firebase/admin'
import type { DecodedIdToken } from 'firebase-admin/auth'
import { cookies } from 'next/headers'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return <p>Não autenticado</p>
  }

  try {
    // TS infere o retorno de verifySessionCookie, mas vamos explicitar:
    const decodedToken: DecodedIdToken = await adminAuth.verifySessionCookie(
      token,
      true
    )

    if (
      !decodedToken.email ||
      typeof decodedToken.email_verified !== 'boolean'
    ) {
      return <p>Erro: dados do usuário inválidos</p>
    }

    const user = {
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      uid: decodedToken.uid
    }

    return <DashboardClient user={user} />
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return <p>Erro na autenticação</p>
  }
}
