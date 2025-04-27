import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

const inviteParamsSchema = z
  .object({
    id: z.string().uuid().openapi({
      description: 'ID do convite',
      example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    }),
  })
  .openapi({
    ref: 'InviteParams',
    description: 'Parâmetros para operações de convite',
  })

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = inviteParamsSchema.parse(params)

  const invite = await prisma.invite.findUnique({
    where: { id },
  })

  if (!invite) {
    return NextResponse.json({ error: 'Invite not found' }, { status: 404 })
  }

  const response = NextResponse.json(invite, { status: 200 })
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = inviteParamsSchema.parse(params)

  await prisma.invite.delete({
    where: { id },
  })

  const response = NextResponse.json(null, { status: 204 })
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}

export const OPTIONS = handleOptionsRequest
