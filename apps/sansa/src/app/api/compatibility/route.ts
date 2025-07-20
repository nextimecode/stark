// api/compatibility/route.ts

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'
import {
  familyPrompt,
  friendshipPrompt,
  lovePrompt,
  type UserData,
  workPrompt
} from './compatibility-prompts'

const prisma = new PrismaClient()

export const compatibilityTestSchema = z
  .object({
    relationshipType: z.enum(['LOVE', 'FRIENDSHIP', 'WORK', 'FAMILY']).meta({
      description: 'Tipo de relacionamento a ser analisado',
      example: 'LOVE'
    }),
    user1Id: z.number().meta({
      description: 'ID do primeiro usuário',
      example: 1
    }),
    user2Id: z
      .number()
      .meta({ description: 'ID do segundo usuário', example: 2 })
  })
  .meta({
    description: 'Dados para análise de compatibilidade entre dois usuários',
    id: 'CompatibilityTest'
  })

export const OPTIONS = async () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*'
    },
    status: 204
  })

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const parsed = compatibilityTestSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
    }

    const { relationshipType, user1Id, user2Id } = parsed.data

    const users = await prisma.user.findMany({
      include: { compatibilityAttributes: true },
      where: { id: { in: [user1Id, user2Id] } }
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
      mbti: attrs1.mbtiType ?? '',
      name: user1.name ?? ''
    }
    const userData2: UserData = {
      mbti: attrs2.mbtiType ?? '',
      name: user2.name ?? ''
    }

    const prompts = {
      FAMILY: familyPrompt,
      FRIENDSHIP: friendshipPrompt,
      LOVE: lovePrompt,
      WORK: workPrompt
    }

    const promptFn = prompts[relationshipType as keyof typeof prompts]
    const prompt = promptFn(userData1, userData2)

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await openai.chat.completions.create({
      messages: [
        {
          content:
            'Você é um assistente especialista em análise de compatibilidade humana, baseado em psicologia, MBTI e Big Five. Sua tarefa é interpretar perfis fornecidos e gerar uma análise detalhada e equilibrada sobre a compatibilidade entre duas pessoas. Seja técnico e respeitoso.',
          role: 'system'
        },
        {
          content: prompt,
          role: 'user'
        }
      ],
      model: 'gpt-4o-mini'
    })

    const completionText = completion.choices?.[0]?.message?.content ?? ''

    const compatibilityTest = await prisma.compatibilityTest.create({
      data: {
        model: 'gpt-4o-mini',
        prompt,
        relationshipType,
        result: { text: completionText },
        user1Id,
        user2Id
      }
    })

    return NextResponse.json(compatibilityTest, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      status: 200
    })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Erro interno no servidor' },
      { status: 500 }
    )
  }
}
