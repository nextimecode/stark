export const dynamic = 'force-dynamic'

import { api } from '@/data/api'

export async function MyMBTI() {
  // Authenticate and retrieve token
  const authResponse = await api('/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'diego@rocketseat.com.br',
      password: '123456'
    })
  })

  let authData
  try {
    authData = await authResponse.json()
    console.error('authData', authData)
  } catch (error) {
    console.error('Erro ao autenticar:', error)
    return <p>Erro ao autenticar</p>
  }

  const accessToken = authData.access_token

  const response = await api('/questions?page=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  console.error('questionsData', response)

  let questionsData
  try {
    questionsData = await response.json()
  } catch (error) {
    console.error('Erro ao buscar perguntas:', error)
    return <p>Erro ao buscar perguntas</p>
  }

  const { questions } = questionsData

  return (
    <ul>{questions?.map((item: any) => <li key={item.id}>{item.slug}</li>)}</ul>
  )
}
