import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async ({ params }: { params: { id: string } }) => {
  const test = await prisma.compatibilityTest.findUnique({
    where: { id: params.id }
  })
  if (!test) return NextResponse.json({ error: 'Test not found' }, { status: 404 })
  return NextResponse.json(test)
}
