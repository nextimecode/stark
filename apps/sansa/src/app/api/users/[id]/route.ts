// api/users/[id]/route.ts

import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const userParamsSchema = z
  .object({
    id: z.number().meta({
      description: 'ID do usuário',
      example: 1
    })
  })
  .meta({
    description: 'Parâmetros para operações de usuário',
    id: 'UserParams'
  })

const updateUserBodySchema = z
  .object({
    birthDate: z
      .string()
      .datetime()
      .meta({
        description: 'Data de nascimento em formato ISO',
        example: '1990-01-01T00:00:00.000Z'
      })
      .optional(),
    email: z
      .string()
      .email()
      .meta({
        description: 'Novo email do usuário',
        example: 'pedro@example.com'
      })
      .optional(),
    fullName: z
      .string()
      .meta({
        description: 'Nome completo do usuário',
        example: 'Pedro Duarte'
      })
      .optional(),
    gender: z
      .string()
      .meta({ description: 'Gênero do usuário', example: 'male' })
      .optional(),
    mbtiType: z
      .string()
      .meta({ description: 'Tipo MBTI do usuário', example: 'INTJ' })
      .optional(),
    name: z
      .string()
      .meta({ description: 'Nome do usuário', example: 'Pedro' })
      .optional()
  })
  .meta({
    description: 'Dados para atualização de usuário',
    id: 'UpdateUser'
  })

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = userParamsSchema.parse(params)

    const user = await prisma.user.findUnique({
      where: { id }
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
      data,
      where: { id }
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
      where: { id }
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

export { handleOptionsRequest as OPTIONS } from '@/lib/handle-options'
