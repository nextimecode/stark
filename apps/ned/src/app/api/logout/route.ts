import { NextResponse } from 'next/server'
import { env } from '@/env'

const allowedOrigins = new Set(
  [
    env.NEXT_PUBLIC_ARYA_URL,
    env.NEXT_PUBLIC_SANSA_URL,
    env.NEXT_PUBLIC_NED_URL
  ].filter(Boolean)
)

const setCorsHeaders = (origin: null | string, response: NextResponse) => {
  if (origin && allowedOrigins.has(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
}

export async function OPTIONS(request: Request) {
  const response = NextResponse.json({})

  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true })

  response.cookies.set('token', '', {
    expires: new Date(0),
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}
