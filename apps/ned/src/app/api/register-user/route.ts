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
  phoneNumber: z.string().optional(),
  firebaseMetadata: z
    .object({
      creationTime: z.string(),
      lastSignInTime: z.string(),
    })
    .optional(),
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
    phoneNumber,
    firebaseMetadata,
  } = result.data

  try {
    await prisma.user.upsert({
      where: { firebaseId },
      update: {
        emailVerified,
        photoURL,
        providerId,
        phoneNumber,
        firebaseMetadata,
      },
      create: {
        firebaseId,
        username: '',
        displayName,
        email,
        emailVerified,
        photoURL,
        providerId,
        phoneNumber,
        firebaseMetadata,
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
