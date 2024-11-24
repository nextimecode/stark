export async function GET() {
  console.error('Chamou o github')
  const delay = () => new Promise(resolve => setTimeout(resolve, 3000))
  await delay()
  return Response.json({ message: 'Github' })
}
