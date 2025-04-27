import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id }
  })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json(user)
}

export const PUT = async ({ params, request }: { params: { id: string }; request: Request }) => {
  const data = await request.json()
  const user = await prisma.user.update({
    where: { id: params.id },
    data
  })
  return NextResponse.json(user)
}

export const DELETE = async ({ params }: { params: { id: string } }) => {
  await prisma.user.delete({ where: { id: params.id } })
  return NextResponse.json(null, { status: 204 })
}
