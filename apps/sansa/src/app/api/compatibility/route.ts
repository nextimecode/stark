// api/compatibility/route.ts

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'
import {
  type UserData,
  familyPrompt,
  friendshipPrompt,
  lovePrompt,
  workPrompt,
} from './compatibility-prompts'

extendZodWithOpenApi(z)

const prisma = new PrismaClient()

export const compatibilityTestSchema = z
  .object({
    user1Id: z.number().openapi({
      description: 'ID do primeiro usuário',
      example: 1,
    }),
    user2Id: z
      .number()
      .openapi({ description: 'ID do segundo usuário', example: 2 }),
    relationshipType: z.enum(['LOVE', 'FRIENDSHIP', 'WORK', 'FAMILY']).openapi({
      description: 'Tipo de relacionamento a ser analisado',
      example: 'LOVE',
    }),
  })
  .openapi({
    ref: 'CompatibilityTest',
    description: 'Dados para análise de compatibilidade entre dois usuários',
  })

export const OPTIONS = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const parsed = compatibilityTestSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 })
    }

    const { user1Id, user2Id, relationshipType } = parsed.data

    const users = await prisma.user.findMany({
      where: { id: { in: [user1Id, user2Id] } },
      include: { compatibilityAttributes: true },
    })

    const user1 = users.find(user => user.id === user1Id)
    const user2 = users.find(user => user.id === user2Id)

    if (!user1 || !user2) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const attrs1 = user1.compatibilityAttributes
    const attrs2 = user2.compatibilityAttributes

    if (!attrs1 || !attrs2) {
      return NextResponse.json(
        { error: 'Atributos de compatibilidade não encontrados' },
        { status: 400 }
      )
    }

    const userData1: UserData = {
      name: user1.name ?? '',
      mbti: attrs1.mbtiType ?? '',
    }
    const userData2: UserData = {
      name: user2.name ?? '',
      mbti: attrs2.mbtiType ?? '',
    }

    const prompts = {
      LOVE: lovePrompt,
      FRIENDSHIP: friendshipPrompt,
      WORK: workPrompt,
      FAMILY: familyPrompt,
    }

    const promptFn = prompts[relationshipType]
    const prompt = promptFn(userData1, userData2)

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente especialista em análise de compatibilidade humana, baseado em psicologia, MBTI e Big Five. Sua tarefa é interpretar perfis fornecidos e gerar uma análise detalhada e equilibrada sobre a compatibilidade entre duas pessoas. Seja técnico e respeitoso.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const completionText = completion.choices?.[0]?.message?.content ?? ''

    const compatibilityTest = await prisma.compatibilityTest.create({
      data: {
        user1Id,
        user2Id,
        relationshipType,
        prompt,
        result: { text: completionText },
        model: 'gpt-4o-mini',
      },
    })

    return NextResponse.json(compatibilityTest, {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Erro interno no servidor' },
      { status: 500 }
    )
  }
}
