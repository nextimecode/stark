import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const invites = await prisma.invite.findMany()
  return NextResponse.json(invites)
}

export const POST = async (request: Request) => {
  const { senderId, recipientId } = await request.json()
  const invite = await prisma.invite.create({
    data: { senderId, recipientId }
  })
  return NextResponse.json(invite, { status: 201 })
}
