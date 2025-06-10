// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// Host gerado pela Vercel em preview ou production (ex: "ned-git-xyz.vercel.app")
const vercelHost = process.env.VERCEL_URL

// Variáveis fixas definidas em .env/.env.local ou no painel Vercel (produção)
const rawFirebaseSA = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
const rawDatabaseUrl = process.env.DATABASE_URL
const rawArya = process.env.NEXT_PUBLIC_ARYA_URL
const rawBran = process.env.NEXT_PUBLIC_BRAN_URL
const rawSansa = process.env.NEXT_PUBLIC_SANSA_URL
const rawNed = process.env.NEXT_PUBLIC_NED_URL

// --- validações SERVER-ONLY (evita break no client/browser) ---
if (typeof window === 'undefined') {
  if (!rawFirebaseSA) {
    throw new Error('🛑 ENV VAR missing: FIREBASE_ADMIN_SERVICE_ACCOUNT')
  }

  if (!rawDatabaseUrl) {
    throw new Error('🛑 ENV VAR missing: DATABASE_URL')
  }
}

// --- monta URLs de preview dinamicamente (só para branches de preview) ---
function derivePreviewUrl(
  service: 'arya' | 'bran' | 'sansa' | 'ned'
): string | undefined {
  // 1. Descobre o host corrente. Prioriza a variável de ambiente da Vercel
  //    (disponível em build/server), mas faz fallback para `window.location.host`
  //    quando no browser. Isso garante funcionalidade também no client‐side
  //    durante requests em ambiente de preview.
  const host =
    vercelHost ??
    (typeof window !== 'undefined' ? window.location.host : undefined)

  if (!host) return

  // 2. Exact match: já estamos no host do serviço solicitado.
  //    Exemplo: "arya-git-feature-123.vercel.app"
  if (host.startsWith(`${service}-`)) {
    return `https://${host}`
  }

  // 3. Preview cross-service: substitui somente o primeiro segmento do subdomínio
  //    pelo serviço desejado, mantendo o restante intacto.
  //    Funciona para diferentes estratégias de nomenclatura, por exemplo:
  //      "ned-git-feature-123.vercel.app"  -> "arya-git-feature-123.vercel.app"
  //      "ned-pr-456.vercel.app"          -> "arya-pr-456.vercel.app"
  //    Se não houver hífen, assumimos que é produção/custom e encerramos.
  const firstDot = host.indexOf('.')
  if (firstDot > 0 && host.includes('-')) {
    const subdomain = host.slice(0, firstDot)
    const rest = host.slice(firstDot) // inclui ponto inicial

    const subdomainSegments = subdomain.split('-')
    if (subdomainSegments.length > 1) {
      subdomainSegments[0] = service
      return `https://${subdomainSegments.join('-')}${rest}`
    }
  }

  // 4. Produção ou host custom — não é possível derivar automaticamente.
  return
}

// --- escolhe URL de preview (quando houver) ou a base definida ---
function pickUrl(
  service: 'arya' | 'bran' | 'sansa' | 'ned',
  base?: string
): string {
  const preview = derivePreviewUrl(service)
  return (
    preview ??
    base ??
    (() => {
      throw new Error(`🛑 Missing URL for ${service}`)
    })()
  )
}

// --- objeto final para createEnv ---
export const env = createEnv({
  server: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string(),
    DATABASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_ARYA_URL: z.string(),
    NEXT_PUBLIC_BRAN_URL: z.string(),
    NEXT_PUBLIC_SANSA_URL: z.string(),
    NEXT_PUBLIC_NED_URL: z.string(),
  },
  runtimeEnv: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: rawFirebaseSA ?? '',
    NEXT_PUBLIC_ARYA_URL: pickUrl('arya', rawArya),
    NEXT_PUBLIC_BRAN_URL: pickUrl('bran', rawBran),
    NEXT_PUBLIC_SANSA_URL: pickUrl('sansa', rawSansa),
    NEXT_PUBLIC_NED_URL: pickUrl('ned', rawNed),
    DATABASE_URL: rawDatabaseUrl ?? '',
  },
})
