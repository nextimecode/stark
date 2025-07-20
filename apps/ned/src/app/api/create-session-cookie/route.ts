import { adminAuth } from '@/firebase/admin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json()
    const expiresIn = 14 * 24 * 60 * 60 * 1000 // 14 dias

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn
    })

    return NextResponse.json({ sessionCookie })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Erro ao criar session cookie' },
      { status: 400 }
    )
  }
}
