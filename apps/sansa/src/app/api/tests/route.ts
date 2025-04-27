import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

// Schema para criação de teste de compatibilidade
const createTestBodySchema = z
  .object({
    user1Id: z
      .string()
      .uuid()
      .openapi({
        description: 'ID do primeiro usuário',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
    user2Id: z
      .string()
      .uuid()
      .openapi({
        description: 'ID do segundo usuário',
        example: '987f6543-e21b-34c5-d678-426614174111',
      }),
    prompt: z
      .string()
      .openapi({
        description: 'Prompt enviado ao modelo para análise de compatibilidade',
        example: 'Compare as personalidades dos dois perfis...',
      }),
    result: z
      .string()
      .openapi({
        description: 'Resposta do modelo com o resultado da análise',
        example: 'Os perfis apresentam altos níveis de empatia...',
      }),
    model: z
      .string()
      .optional()
      .openapi({
        description: 'Nome do modelo utilizado para a análise',
        example: 'gpt-4o-mini',
      }),
  })
  .openapi({
    ref: 'CreateCompatibilityTest',
    description: 'Dados para criação de um novo teste de compatibilidade',
  })

export const GET = async (request: Request) => {
  try {
    const tests = await prisma.compatibilityTest.findMany()
    const response = NextResponse.json(tests, { status: 200 })
    const origin = request.headers.get('origin')
    setCorsHeaders(origin, response)
    return response
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao listar testes' },
      { status: 500 }
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { user1Id, user2Id, prompt, result, model } = createTestBodySchema.parse(body)

    const test = await prisma.compatibilityTest.create({
      data: { user1Id, user2Id, prompt, result, model },
    })

    const response = NextResponse.json(test, { status: 201 })
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
