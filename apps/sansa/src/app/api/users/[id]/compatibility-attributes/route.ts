import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async ({ params }: { params: { userId: string } }) => {
  const attrs = await prisma.compatibilityAttributes.findUnique({
    where: { userId: params.userId }
  })
  if (!attrs) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(attrs)
}

export const PUT = async ({ params, request }: { params: { userId: string }; request: Request }) => {
  const data = await request.json()
  const attrs = await prisma.compatibilityAttributes.upsert({
    where: { userId: params.userId },
    update: data,
    create: { userId: params.userId, ...data }
  })
  return NextResponse.json(attrs)
}
