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

  const vercelUrl = process.env.VERCEL_BRANCH_URL
  const projectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'

  try {
    const userList = await admin.auth().listUsers()
    return {
      key,
      message: `🔥 Firebase Admin funcionando! Usuários encontrados: ${userList.users.length}`,
      vercelUrl,
      projectProductionUrl,
      isPreview
    }
  } catch (error) {
    return {
      key,
      message: `${(error as Error).message}`,
      vercelUrl,
      projectProductionUrl,
      isPreview
    }
  }
}

export default async function Teste() {
  const { message, key, vercelUrl, projectProductionUrl, isPreview } =
    await getHomeData()

  return (
    <main>
      <div className="max-w-[85rem] mt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-12">❌{message}</p>
        <p>{key}</p>
        <p>{vercelUrl}</p>
        <p>{projectProductionUrl}</p>
        <p>{isPreview}</p>
      </div>
    </main>
  )
}
