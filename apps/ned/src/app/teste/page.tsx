import { Metadata } from 'next'
import Image from 'next/image'

import { HomeProps } from '@/data/types/home'

export const metadata: Metadata = {
  title: 'Home Edoras'
}

async function getHomeData(): Promise<HomeProps> {
  if (typeof window !== 'undefined') {
    throw new Error('getHomeData só pode ser chamado no servidor.')
  }

  const { admin } = await import('@/firebase/admin') // Importa dinamicamente no servidor

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
  const { message } = await getHomeData() // Garante que só é chamado no servidor

  return (
    <main>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
          Start your journey with{' '}
          <span className="text-blue-600">{message}</span>
        </h1>
      </div>
    </main>
  )
}
