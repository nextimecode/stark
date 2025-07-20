import type { NextResponse } from 'next/server'
import { env } from '@/env'

const allowedOrigins = new Set(
  [
    env.NEXT_PUBLIC_ARYA_URL,
    env.NEXT_PUBLIC_SANSA_URL,
    env.NEXT_PUBLIC_NED_URL
  ].filter(Boolean)
)

export const setCorsHeaders = (
  origin: null | string,
  response: NextResponse
) => {
  if (origin && allowedOrigins.has(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
}
