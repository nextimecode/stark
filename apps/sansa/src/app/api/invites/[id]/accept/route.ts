import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const POST = async ({ params }: { params: { id: string } }) => {
  const invite = await prisma.invite.update({
    where: { id: params.id },
    data: { status: 'ACCEPTED', acceptedAt: new Date() },
  })
  return NextResponse.json(invite)
}
