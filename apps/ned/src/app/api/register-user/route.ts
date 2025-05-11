import { NextResponse } from 'next/server'

import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const userRegisterBodySchema = z.object({
  firebaseId: z.string(),
  displayName: z.string().optional(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  photoURL: z.string().optional(),
  providerId: z.string(),
  creationTime: z.string().optional(),
})

export type UserRegisterBodySchema = z.infer<typeof userRegisterBodySchema>

export async function POST(req: Request) {
  const body = await req.json()
  const result = userRegisterBodySchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  const {
    firebaseId,
    displayName,
    email,
    emailVerified,
    photoURL,
    providerId,
    creationTime,
  } = result.data

  try {
    await prisma.user.upsert({
      where: { firebaseId },
      update: {
        authTime: creationTime ? creationTime : new Date(),
        emailVerified,
        photoURL,
        providerId,
      },
      create: {
        firebaseId,
        username: '',
        displayName,
        email,
        emailVerified,
        photoURL,
        providerId,
        authTime: creationTime ? creationTime : new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
