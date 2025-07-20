// api/invites/[id]/route.ts

import { prisma } from '@/lib/prisma'
import { inviteParamsSchema } from '@/lib/schemas/invite-params'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = inviteParamsSchema.parse(await params)

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
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = inviteParamsSchema.parse(await params)

  await prisma.invite.delete({
    where: { id }
  })

  const response = NextResponse.json(null, { status: 204 })
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}

export { handleOptionsRequest as OPTIONS } from '@/lib/handle-options'
