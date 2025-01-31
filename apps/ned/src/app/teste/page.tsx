import { Metadata } from 'next'

import { HomeProps } from '@/data/types/home'
import { getFirebaseAdmin } from '@/firebase/admin'

export const metadata: Metadata = {
  title: 'Home Edoras'
}

export const dynamic = 'force-dynamic'

async function getHomeData(): Promise<HomeProps> {
  if (typeof window !== 'undefined') {
    throw new Error('getHomeData só pode ser chamado no servidor.')
  }

  const { admin, key } = getFirebaseAdmin()

  console.error(JSON.parse(key))

  try {
    const userList = await admin.auth().listUsers(1)
    return {
      key,
      message: `🔥 Firebase Admin funcionando! Usuários encontrados: ${userList.users.length}`
    }
  } catch (error) {
    return {
      key,
      message: `${(error as Error).message}`
    }
  }
}

export default async function Teste() {
  const { message, key } = await getHomeData()

  return (
    <main>
      <div className="max-w-[85rem] mt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-12">❌{message}</p>
        <p>{key}</p>
      </div>
    </main>
  )
}
