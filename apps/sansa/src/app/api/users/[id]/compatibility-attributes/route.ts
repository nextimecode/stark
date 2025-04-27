// src/app/api/users/[id]/compatibility-attributes/route.ts

import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

/* ---------- Schemas ---------- */
const paramsSchema = z
  .object({
    id: z.string().uuid().openapi({
      description: 'ID do usuário',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  })
  .openapi({ ref: 'CompatibilityAttributesParams' })

const bodySchema = z
  .object({})
  .passthrough()
  .openapi({ ref: 'CompatibilityAttributesBody' })

/* ---------- Handlers ---------- */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // params é Promise!
) {
  const params = await context.params // <- aguarda
  const { id } = paramsSchema.parse(params)
  const attrs = await prisma.compatibilityAttributes.findUnique({
    where: { userId: id },
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
  const params = await context.params // <- aguarda
  const { id } = paramsSchema.parse(params)
  const data = bodySchema.parse(await request.json())

  const attrs = await prisma.compatibilityAttributes.upsert({
    where: { userId: id },
    update: data,
    create: { userId: id, ...data },
  })

  const res = NextResponse.json(attrs)
  setCorsHeaders(request.headers.get('origin'), res)
  return res
}

export const OPTIONS = handleOptionsRequest
