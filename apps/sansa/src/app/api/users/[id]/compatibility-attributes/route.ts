// api/users/[id]/compatibility-attributes/route.ts

import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z
    .string()
    .transform(val => {
      const num = Number(val)

      if (Number.isNaN(num)) {
        throw new TypeError('Invalid user ID')
      }
      return num
    })
    .meta({
      description: 'ID do usuário',
      example: '1'
    })
})

const bodySchema = z
  .object({})
  .passthrough()
  .meta({ id: 'CompatibilityAttributesBody' })

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  const { id } = paramsSchema.parse(params)
  const attrs = await prisma.compatibilityAttributes.findUnique({
    where: { userId: id }
  })

  const res = attrs
    ? NextResponse.json(attrs)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })

  setCorsHeaders(request.headers.get('origin'), res)
  return res
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  const { id } = paramsSchema.parse(params)
  const data = bodySchema.parse(await request.json())

  const attrs = await prisma.compatibilityAttributes.upsert({
    create: { userId: id, ...data },
    update: data,
    where: { userId: id }
  })

  const res = NextResponse.json(attrs)
  setCorsHeaders(request.headers.get('origin'), res)
  return res
}

export { handleOptionsRequest as OPTIONS } from '@/lib/handle-options'
