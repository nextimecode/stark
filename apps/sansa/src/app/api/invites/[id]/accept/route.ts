import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

export const inviteParamsSchema = z
  .object({
    id: z
      .string()
      .transform(val => {
        const num = Number(val)
        if (Number.isNaN(num)) throw new Error('Invalid invite ID')
        return num
      })
      .openapi({
        description: 'ID do convite',
        example: '1',
      }),
  })
  .openapi({
    ref: 'InviteParams',
    description: 'Parâmetros para atualização de convite',
  })

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = inviteParamsSchema.parse(await params)

    const invite = await prisma.invite.update({
      where: { id },
      data: { status: 'ACCEPTED', acceptedAt: new Date() },
    })

    const response = NextResponse.json(invite, { status: 200 })
    const origin = request.headers.get('origin')
    setCorsHeaders(origin, response)

    return response
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Falha na validação ou na atualização do convite',
      },
      { status: 400 }
    )
  }
}

export const OPTIONS = handleOptionsRequest
