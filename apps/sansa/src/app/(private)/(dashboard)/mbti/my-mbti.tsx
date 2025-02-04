export async function MyMBTI() {
  // Authenticate and retrieve token
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

  // Fetch recent questions using retrieved token
  const response = await fetch('http://localhost:3333/questions?page=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    next: {
      tags: ['get-tags']
    }
  })

  const { questions } = await response.json()

  return (
    <ul>
      {questions.map((item: any) => (
        <li key={item.id}>{item.slug}</li>
      ))}
    </ul>
  )
}
