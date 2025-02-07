import { NextResponse } from 'next/server'

import { env } from '@/env'

// Lista de origens permitidas
const allowedOrigins = [
  env.NEXT_PUBLIC_ARYA_URL,
  env.NEXT_PUBLIC_BRAN_URL,
  env.NEXT_PUBLIC_SANSA_URL,
  env.NEXT_PUBLIC_NED_URL
].filter(Boolean) // Remove valores undefined

// Função para configurar os headers CORS dinamicamente
const setCorsHeaders = (origin: string | null, response: NextResponse) => {
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
}

export async function OPTIONS(request: Request) {
  const response = NextResponse.json({})

  // Configura os headers CORS dinamicamente para preflight requests
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true })

  // Expira o cookie
  response.cookies.set('token', '', {
    maxAge: -1,
    path: '/'
  })

  // Configura os headers CORS dinamicamente
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}
