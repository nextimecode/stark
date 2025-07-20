import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const inviteParamsSchema = z
  .object({
    id: z
      .string()
      .transform(val => {
        const num = Number(val)

        if (Number.isNaN(num)) {
          throw new TypeError('Invalid invite ID')
        }
        return num
      })
      .meta({
        description: 'ID do convite',
        example: '1'
      })
  })
  .meta({
    description: 'Parâmetros para rejeição de convite',
    id: 'InviteParams'
  })

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = inviteParamsSchema.parse(await params)

    const invite = await prisma.invite.update({
      data: { status: 'REJECTED' },
      where: { id }
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
            : 'Falha na validação ou na rejeição do convite'
      },
      { status: 400 }
    )
  }
}

export { handleOptionsRequest as OPTIONS } from '@/lib/handle-options'
