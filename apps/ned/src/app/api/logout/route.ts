import { NextResponse } from 'next/server'

const allowedOrigin = process.env.NEXT_PUBLIC_ARYA_URL!

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true'
      }
    }
  )
}

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('token', '', {
    maxAge: -1,
    path: '/'
  })
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}
