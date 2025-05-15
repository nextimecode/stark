// api/users/[id]/route.ts

import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

const userParamsSchema = z
  .object({
    id: z.number().openapi({
      description: 'ID do usuário',
      example: 1,
    }),
  })
  .openapi({
    ref: 'UserParams',
    description: 'Parâmetros para operações de usuário',
  })

const updateUserBodySchema = z
  .object({
    email: z
      .string()
      .email()
      .openapi({
        description: 'Novo email do usuário',
        example: 'pedro@example.com',
      })
      .optional(),
    name: z
      .string()
      .openapi({ description: 'Nome do usuário', example: 'Pedro' })
      .optional(),
    fullName: z
      .string()
      .openapi({
        description: 'Nome completo do usuário',
        example: 'Pedro Duarte',
      })
      .optional(),
    birthDate: z
      .string()
      .datetime()
      .openapi({
        description: 'Data de nascimento em formato ISO',
        example: '1990-01-01T00:00:00.000Z',
      })
      .optional(),
    gender: z
      .string()
      .openapi({ description: 'Gênero do usuário', example: 'male' })
      .optional(),
    mbtiType: z
      .string()
      .openapi({ description: 'Tipo MBTI do usuário', example: 'INTJ' })
      .optional(),
  })
  .openapi({
    ref: 'UpdateUser',
    description: 'Dados para atualização de usuário',
  })

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = userParamsSchema.parse(params)

    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const response = NextResponse.json(user, { status: 200 })
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

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = userParamsSchema.parse(params)
    const data = updateUserBodySchema.parse(await request.json())

    const user = await prisma.user.update({
      where: { id },
      data,
    })

    const response = NextResponse.json(user, { status: 200 })
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

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = userParamsSchema.parse(params)

    await prisma.user.delete({
      where: { id },
    })

    const response = NextResponse.json(null, { status: 204 })
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
