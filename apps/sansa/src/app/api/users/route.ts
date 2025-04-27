import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export const POST = async (request: Request) => {
  const { uid, email, displayName, emailVerified, providerId } = await request.json()

  const user = await prisma.user.create({
    data: {
      firebaseId: uid,
      username: '',
      name: displayName || '',
      email,
      emailVerified,
      picture: null,
      provider: providerId,
      authTime: null,
    },
  })

  return NextResponse.json(user, { status: 201 })
}
