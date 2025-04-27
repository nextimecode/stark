import { handleOptionsRequest } from '@/lib/handle-options'
import { prisma } from '@/lib/prisma'
import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(z)

const testParamsSchema = z
  .object({
    id: z
      .string()
      .uuid()
      .openapi({
        description: 'ID do teste de compatibilidade',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
  })
  .openapi({
    ref: 'TestParams',
    description: 'Parâmetros para consulta de Teste de Compatibilidade',
  })

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = testParamsSchema.parse(params)

    const test = await prisma.compatibilityTest.findUnique({
      where: { id },
    })

    if (!test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      )
    }

    const response = NextResponse.json(test, { status: 200 })
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
