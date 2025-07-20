import { setCorsHeaders } from '@/lib/set-cors-headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const subscriptionSchema = z
  .object({
    email: z.string().email().meta({
      description: 'Email do assinante',
      example: 'pedro@example.com'
    }),
    name: z
      .string()
      .meta({ description: 'Nome do assinante', example: 'Pedro Duarte' })
  })
  .meta({ description: 'Dados para inscrição', id: 'Subscription' })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name } = subscriptionSchema.parse(body)

    console.log('Subscription data:', { email, name })

    const response = NextResponse.json({ email, name }, { status: 201 })
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
