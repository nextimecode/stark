import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'
import {
  familyPrompt,
  friendshipPrompt,
  lovePrompt,
  UserData,
  workPrompt,
} from './compatibility-prompts'

const prisma = new PrismaClient()

const BodySchema = z.object({
  user1Id: z.string(),
  user2Id: z.string(),
  relationshipType: z.enum(['LOVE', 'FRIENDSHIP', 'WORK', 'FAMILY']),
})

export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const parsed = BodySchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 })
    }

    const { user1Id, user2Id, relationshipType } = parsed.data

    const users = await prisma.user.findMany({
      where: { id: { in: [user1Id, user2Id] } },
      include: { compatibilityAttributes: true },
    })

    const user1 = users.find(u => u.id === user1Id)
    const user2 = users.find(u => u.id === user2Id)

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
      name: user1.name,
      mbti: attrs1.mbtiType ?? '',
    }
    const userData2: UserData = {
      name: user2.name,
      mbti: attrs2.mbtiType ?? '',
    }

    let prompt = ''
    switch (relationshipType) {
      case 'LOVE':
        prompt = lovePrompt(userData1, userData2)
        break
      case 'FRIENDSHIP':
        prompt = friendshipPrompt(userData1, userData2)
        break
      case 'WORK':
        prompt = workPrompt(userData1, userData2)
        break
      case 'FAMILY':
        prompt = familyPrompt(userData1, userData2)
        break
    }

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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro interno no servidor' },
      { status: 500 }
    )
  }
}
