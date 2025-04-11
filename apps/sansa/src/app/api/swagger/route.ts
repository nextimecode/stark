import { NextResponse } from 'next/server'

import { openApiDocument } from '@/lib/openapi'

export const GET = () => {
  return NextResponse.json(openApiDocument)
}
