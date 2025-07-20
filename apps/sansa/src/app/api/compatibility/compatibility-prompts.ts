// api/compatibility/compatibility-prompts.ts

// Dados básicos do usuário necessários para a geração do prompt
export interface UserData {
  mbti: string
  name: string
  // Você pode adicionar outros campos conforme necessário (idade, interesses, etc.)
}

// Prompt para relacionamento familiar (FAMILY)
export function familyPrompt(user1: UserData, user2: UserData): string {
  return `Você é um psicólogo familiar. Analise a dinâmica familiar entre:
- ${user1.name}: personalidade MBTI ${user1.mbti}.
- ${user2.name}: personalidade MBTI ${user2.mbti}.
Descreva como essas personalidades afetam o relacionamento familiar, comentando sobre pontos fortes e desafios na convivência diária.`
}

// Prompt para amizade (FRIENDSHIP)
export function friendshipPrompt(user1: UserData, user2: UserData): string {
  return `Você é um especialista em amizades. Analise a compatibilidade de amizade entre:
- ${user1.name}: personalidade MBTI ${user1.mbti}.
- ${user2.name}: personalidade MBTI ${user2.mbti}.
Explique como as personalidades de cada um podem se complementar ou conflitar, destacando fatores que fortalecem ou desafiam a amizade.`
}

// Prompt para compatibilidade amorosa (LOVE)
export function lovePrompt(user1: UserData, user2: UserData): string {
  return `Você é um especialista em relacionamentos. Analise a compatibilidade amorosa entre duas pessoas:
- ${user1.name}: personalidade MBTI ${user1.mbti}.
- ${user2.name}: personalidade MBTI ${user2.mbti}.
Descreva os pontos fortes e desafios dessa combinação, fornecendo detalhes sobre como as personalidades interagem em um contexto romântico.`
}

// Prompt para ambiente de trabalho (WORK)
export function workPrompt(user1: UserData, user2: UserData): string {
  return `Você é um consultor de equipes de trabalho. Analise a compatibilidade profissional entre:
- ${user1.name}: personalidade MBTI ${user1.mbti}.
- ${user2.name}: personalidade MBTI ${user2.mbti}.
Detalhe como as personalidades influenciam o trabalho em equipe, incluindo pontos de sinergia e possíveis conflitos no ambiente profissional.`
}
