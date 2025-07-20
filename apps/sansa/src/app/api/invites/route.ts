// api/invites/route.ts

import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Schema para criação de convite
export const createInviteBodySchema = z
  .object({
    recipientId: z.number().meta({
      description: 'ID do usuário que recebe o convite',
      example: 2
    }),
    senderId: z.number().meta({
      description: 'ID do usuário que envia o convite',
      example: 1
    })
  })
  .meta({
    description: 'Dados para criação de um novo convite',
    id: 'CreateInvite'
  })

export const GET = async (request: Request) => {
  try {
    const invites = await prisma.invite.findMany()
    const response = NextResponse.json(invites, { status: 200 })
    const origin = request.headers.get('origin')
    setCorsHeaders(origin, response)
    return response
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Erro ao listar convites'
      },
      { status: 500 }
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { recipientId, senderId } = createInviteBodySchema.parse(body)

    const invite = await prisma.invite.create({
      data: { recipientId, senderId }
    })

    const response = NextResponse.json(invite, { status: 201 })
    const origin = request.headers.get('origin')
    setCorsHeaders(origin, response)
    return response
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Validation failed' },
      { status: 400 }
    )
  }
}

export { handleOptionsRequest as OPTIONS } from '@/lib/handle-options'
