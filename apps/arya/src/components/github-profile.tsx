import { api } from '@/data/api'
import { HomeProps } from '@/data/types/home'
import { Suspense } from 'react'

export default async function GithubProfile() {
  const { message } = await getHomeData()
  const response = await getHomeData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<div>Carregando...</div>}>
        {/* <Button>{message}</Button> */}
      </Suspense>
      {/* <Button>{response.message}</Button> */}
    </main>
  )
}

async function getHomeData(): Promise<HomeProps> {
  const response = await api('/github')
  const message = await response.json()
  return message
}
