import { openApiDocument } from '@/lib/openapi'
import { NextResponse } from 'next/server'

export const GET = () => {
  return NextResponse.json(openApiDocument)
}
