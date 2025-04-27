import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

// Schema para criação de convite
const createInviteBodySchema = z
  .object({
    senderId: z.string().uuid().openapi({
      description: 'ID do usuário que envia o convite',
      example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    }),
    recipientId: z.string().uuid().openapi({
      description: 'ID do usuário que recebe o convite',
      example: 'f1e2d3c4-b5a6-0987-zyxw-vu654321fedc',
    }),
  })
  .openapi({
    ref: 'CreateInvite',
    description: 'Dados para criação de um novo convite',
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
          error instanceof Error ? error.message : 'Erro ao listar convites',
      },
      { status: 500 }
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { senderId, recipientId } = createInviteBodySchema.parse(body)

    const invite = await prisma.invite.create({
      data: { senderId, recipientId },
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

export const OPTIONS = handleOptionsRequest
