import { Metadata } from 'next'

import { HomeProps } from '@/data/types/home'

export const metadata: Metadata = {
  title: 'Home Edoras'
}

// 🔥 Força a renderização dinâmica (somente no servidor)
export const dynamic = 'force-dynamic'

async function getHomeData(): Promise<HomeProps> {
  if (typeof window !== 'undefined') {
    throw new Error('getHomeData só pode ser chamado no servidor.')
  }

  const { admin } = await import('@/firebase/admin')

  try {
    const userList = await admin.auth().listUsers(1)
    return {
      message: `🔥 Firebase Admin funcionando! Usuários encontrados: ${userList.users.length}`
    }
  } catch (error) {
    return { message: `❌ Erro no Firebase Admin: ${error}` }
  }
}

export default async function Teste() {
  const { message } = await getHomeData()

  return (
    <main>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-blue-600">{message}</span>
      </div>
    </main>
  )
}
