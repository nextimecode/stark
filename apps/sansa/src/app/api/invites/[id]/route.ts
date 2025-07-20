// api/invites/[id]/route.ts

import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const inviteParamsSchema = z
  .object({
    id: z.number().meta({
      description: 'ID do convite',
      example: 1
    })
  })
  .meta({
    description: 'Parâmetros para operações de convite',
    id: 'InviteParams'
  })

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = inviteParamsSchema.parse(params)

  const invite = await prisma.invite.findUnique({
    where: { id }
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
    where: { id }
  })

  const response = NextResponse.json(null, { status: 204 })
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}

export { handleOptionsRequest as OPTIONS } from '@/lib/handle-options'
