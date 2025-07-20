export const dynamic = 'force-dynamic'

import { api } from '@/data/api'
import { notFound } from 'next/navigation'

interface Question {
  id: string
  slug: string
}

const fetchQuestions = async () => {
  const authResponse = await api('/sessions', {
    body: JSON.stringify({
      email: 'diego@rocketseat.com.br',
      password: process.env.TEST_PASSWORD || 'test-password'
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  })

  if (!authResponse.ok) {
    throw new Error('Falha na autenticação')
  }

  const authData = await authResponse.json()
  const accessToken = authData.access_token

  // Buscar perguntas
  const response = await api('/questions?page=1', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar perguntas')
  }

  const questionsData = await response.json()
  return questionsData.questions
}

export const MyMBTI = async () => {
  let questions: Question[] = []

  try {
    questions = await fetchQuestions()
  } catch {
    notFound()
  }

  if (!questions || questions.length === 0) {
    return <p>Nenhuma pergunta encontrada.</p>
  }

  return (
    <ul>
      {questions.map(item => (
        <li key={item.id}>{item.slug}</li>
      ))}
    </ul>
  )
}
