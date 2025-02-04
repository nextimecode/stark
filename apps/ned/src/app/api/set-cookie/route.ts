import { NextResponse } from 'next/server'

import { admin } from '@/firebase/admin'

export async function POST(request: Request) {
  const { token } = await request.json()
  const expiresIn = 60 * 60 * 24 * 5 * 1000
  const sessionCookie = await admin
    .auth()
    .createSessionCookie(token, { expiresIn })
  const response = NextResponse.json({ success: true })
  response.cookies.set('token', sessionCookie, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: expiresIn / 1000
  })
  return response
}
