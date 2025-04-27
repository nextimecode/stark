import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

const compatibilityAttributesParamsSchema = z
  .object({
    userId: z.string().uuid().openapi({
      description: 'ID do usuário',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  })
  .openapi({
    ref: 'CompatibilityAttributesParams',
    description: 'Parâmetros para operações em CompatibilityAttributes',
  })

const compatibilityAttributesBodySchema = z.object({}).passthrough().openapi({
  ref: 'CompatibilityAttributesBody',
  description:
    'Dados para criação ou atualização de atributos de compatibilidade',
})

export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = compatibilityAttributesParamsSchema.parse(params)

  const attrs = await prisma.compatibilityAttributes.findUnique({
    where: { userId },
  })

  if (!attrs) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const response = NextResponse.json(attrs, { status: 200 })
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)
  return response
}

export const PUT = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = compatibilityAttributesParamsSchema.parse(params)
  const data = compatibilityAttributesBodySchema.parse(await request.json())

  const attrs = await prisma.compatibilityAttributes.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  })

  const response = NextResponse.json(attrs, { status: 200 })
  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)
  return response
}

export const OPTIONS = handleOptionsRequest
