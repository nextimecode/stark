import { NextResponse } from 'next/server'

import { z } from 'zod'

import { executeWithRetry } from '@/lib/prisma'

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
  try {
    const body = await req.json()
    const result = userRegisterBodySchema.safeParse(body)

    if (!result.success) {
      console.error('Validation error:', result.error)
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

    console.log('Attempting to upsert user:', {
      firebaseId,
      email,
    })

    const user = await executeWithRetry(async client => {
      return client.user.upsert({
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
    })

    console.log('User upserted successfully:', user.id)
    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    console.error('Database error:', error)

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
