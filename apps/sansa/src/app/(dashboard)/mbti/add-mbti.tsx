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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'diego@rocketseat.com.br',
        password: '123456'
      })
    })

    const authData = await authResponse.json()
    const accessToken = authData.access_token

    await fetch('http://localhost:3333/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        title,
        content: 'Teste',
        attachments: []
      })
    })

    revalidateTag('get-tags')
  }

  return (
    <form action={handleCreateTag}>
      <input type="text" name="title" placeholder="title do mbti" />
      <AddMBTIButton />
    </form>
  )
}
