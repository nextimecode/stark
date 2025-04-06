import { NextResponse } from 'next/server'

import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const userSchema = z.object({
  uid: z.string(),
  displayName: z.string().optional(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  photoURL: z.string().nullable().optional(),
  providerId: z.string(),
  creationTime: z.string().optional()
})

export async function POST(req: Request) {
  const body = await req.json()
  const result = userSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  const {
    uid,
    displayName,
    email,
    emailVerified,
    photoURL,
    providerId,
    creationTime
  } = result.data

  try {
    await prisma.user.upsert({
      where: { firebaseId: uid },
      update: {
        authTime: creationTime ? new Date(creationTime) : null,
        emailVerified,
        picture: photoURL,
        provider: providerId
      },
      create: {
        firebaseId: uid,
        username: '',
        name: displayName || '',
        email,
        emailVerified,
        picture: photoURL,
        provider: providerId,
        authTime: creationTime ? new Date(creationTime) : null
      }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao salvar ou atualizar usuário' },
      { status: 500 }
    )
  }
}
