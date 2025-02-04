export const dynamic = 'force-dynamic'

import { api } from '@/data/api'

export async function MyMBTI() {
  // Authenticate and retrieve token
  // const authResponse = await api('/sessions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email: 'diego@rocketseat.com.br',
  //     password: '123456'
  //   })
  // })

  // const authData = await authResponse.json()
  // const accessToken = authData.access_token

  // const response = await api('/questions?page=1', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   },
  //   next: {
  //     tags: ['get-tags']
  //   }
  // })

  // const { questions } = await response.json()

  return (
    <ul>
      {/* {questions.map((item: any) => (
        <li key={item.id}>{item.slug}</li>
      ))} */}
      // TODO: resolver problema do deploy da api
    </ul>
  )
}
