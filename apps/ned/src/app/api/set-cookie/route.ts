// app/api/set-cookie/route.ts

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { env } from '@/env'
import { admin } from '@/firebase/admin'

const ALLOWED_ORIGINS = [
  env.NEXT_PUBLIC_ARYA_URL,
  env.NEXT_PUBLIC_BRAN_URL,
  env.NEXT_PUBLIC_SANSA_URL,
  env.NEXT_PUBLIC_NED_URL,
].filter(Boolean)

function applyCors(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get('origin')
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin)
    res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    res.headers.set('Access-Control-Allow-Credentials', 'true')
  }
  return res
}

export function OPTIONS(req: NextRequest) {
  return applyCors(req, NextResponse.json({}))
}

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    const expiresIn = 14 * 24 * 60 * 60 * 1000

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(token, { expiresIn })

    const res = NextResponse.json({ success: true })
    res.cookies.set('token', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
      maxAge: expiresIn / 1000,
    })

    return applyCors(req, res)
  } catch (error) {
    console.error('Erro ao criar session cookie:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Erro interno' },
      { status: 500 }
    )
  }
}
