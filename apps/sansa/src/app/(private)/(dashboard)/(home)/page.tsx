import { cookies } from 'next/headers'

import { admin } from '@/firebase/admin'

import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    return <p>Não autenticado</p>
  }
  let decodedToken
  try {
    decodedToken = await admin.auth().verifySessionCookie(token)
  } catch {
    return <p>Erro na autenticação</p>
  }
  if (!decodedToken.email || typeof decodedToken.email_verified !== 'boolean') {
    return <p>Erro: dados do usuário inválidos</p>
  }
  const user = {
    uid: decodedToken.uid,
    email: decodedToken.email,
    emailVerified: decodedToken.email_verified
  }
  return <DashboardClient user={user} />
}
