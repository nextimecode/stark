export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

import { HomeProps } from '@/data/types/home'
import { admin, key } from '@/firebase/admin'

export const metadata: Metadata = {
  title: 'Teste'
}

async function getHomeData(): Promise<HomeProps> {
  if (typeof window !== 'undefined') {
    throw new Error('getHomeData só pode ser chamado no servidor.')
  }

  const vercelUrl = process.env.VERCEL_URL

  try {
    const userList = await admin.auth().listUsers()
    return {
      key,
      message: `🔥 Firebase Admin funcionando! Usuários encontrados: ${userList.users.length}`,
      vercelUrl
    }
  } catch (error) {
    return {
      key,
      message: `${(error as Error).message}`,
      vercelUrl
    }
  }
}

export default async function Teste() {
  const { message, key, vercelUrl } = await getHomeData()

  return (
    <main>
      <div className="max-w-[85rem] mt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-12">❌{message}</p>
        <p>{key}</p>
        <p>{vercelUrl}</p>
      </div>
    </main>
  )
}
