import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export const POST = async (request: Request) => {
  const { email } = await request.json()
  const user = await prisma.user.create({
    data: { email }
  })
  return NextResponse.json(user, { status: 201 })
}
