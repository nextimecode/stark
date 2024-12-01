export async function GET() {
  const delay = () => new Promise(resolve => setTimeout(resolve, 3000))
  await delay()
  return Response.json({ message: 'Teste' })
}
