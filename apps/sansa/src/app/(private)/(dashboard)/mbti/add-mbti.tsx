import { revalidateTag } from 'next/cache'
import { AddMBTIButton } from './add-mbti-button'

export function AddMBTI() {
  async function handleCreateTag(form: FormData) {
    'use server'

    const title = form.get('title')

    if (!title) {
      return
    }

    // delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    const authResponse = await fetch('http://localhost:3333/sessions', {
      body: JSON.stringify({
        email: 'diego@rocketseat.com.br',
        password: process.env.TEST_PASSWORD || 'test-password'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const authData = await authResponse.json()
    const accessToken = authData.access_token

    await fetch('http://localhost:3333/questions', {
      body: JSON.stringify({
        attachments: [],
        content: 'Teste',
        title
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    revalidateTag('get-tags')
  }

  return (
    <form action={handleCreateTag}>
      <input name="title" type="text" placeholder="title do mbti" />
      <AddMBTIButton />
    </form>
  )
}
