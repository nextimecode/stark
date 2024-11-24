export async function GET() {
  console.error('Chamou a api')
  const delay = () => new Promise(resolve => setTimeout(resolve, 3000))
  await delay()
  return Response.json({ message: 'Teste' })
}
