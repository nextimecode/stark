import { NextResponse } from 'next/server'
import { setCorsHeaders } from './set-cors-headers'

export const handleOptionsRequest = (request: Request) => {
  const response = new NextResponse(null, { status: 204 })
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)
  return response
}
