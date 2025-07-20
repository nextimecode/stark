import { NextResponse } from 'next/server'
import { z } from 'zod'
import { executeWithRetry } from '@/lib/prisma'

const userRegisterBodySchema = z.object({
  displayName: z.string().optional(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  firebaseId: z.string(),
  firebaseMetadata: z
    .object({
      creationTime: z.string(),
      lastSignInTime: z.string()
    })
    .optional(),
  phoneNumber: z.string().optional(),
  photoURL: z.string().optional(),
  providerId: z.string()
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
      displayName,
      email,
      emailVerified,
      firebaseId,
      firebaseMetadata,
      phoneNumber,
      photoURL,
      providerId
    } = result.data

    console.log('Attempting to upsert user:', {
      email,
      firebaseId
    })

    const user = await executeWithRetry(async client => {
      return client.user.upsert({
        create: {
          displayName,
          email,
          emailVerified,
          firebaseId,
          firebaseMetadata,
          phoneNumber,
          photoURL,
          providerId,
          username: ''
        },
        update: {
          emailVerified,
          firebaseMetadata,
          phoneNumber,
          photoURL,
          providerId
        },
        where: { firebaseId }
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
