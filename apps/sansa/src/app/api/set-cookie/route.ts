import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    const expiresIn = 14 * 24 * 60 * 60 // 14 dias

    const res = NextResponse.json({ success: true })
    res.cookies.set('token', token, {
      httpOnly: true,
      maxAge: expiresIn,
      path: '/',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
    return res
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Erro ao configurar o cookie' },
      { status: 500 }
    )
  }
}
