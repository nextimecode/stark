import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async ({ params }: { params: { id: string } }) => {
  const invite = await prisma.invite.findUnique({
    where: { id: params.id }
  })
  if (!invite) return NextResponse.json({ error: 'Invite not found' }, { status: 404 })
  return NextResponse.json(invite)
}

export const DELETE = async ({ params }: { params: { id: string } }) => {
  await prisma.invite.delete({ where: { id: params.id } })
  return NextResponse.json(null, { status: 204 })
}
