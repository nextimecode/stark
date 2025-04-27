import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const tests = await prisma.compatibilityTest.findMany()
  return NextResponse.json(tests)
}

export const POST = async (request: Request) => {
  const { user1Id, user2Id, prompt, result, model } = await request.json()
  const test = await prisma.compatibilityTest.create({
    data: { user1Id, user2Id, prompt, result, model },
  })
  return NextResponse.json(test, { status: 201 })
}
