// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// --- Types & helpers --------------------------------------------------------

type Service = 'arya' | 'bran' | 'sansa' | 'ned'

// Usa a variável pública em primeiro lugar (disponível também no client) e
// faz fallback para VERCEL_URL apenas em build/server.
const vercelHost = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL

function derivePreviewUrl(service: Service): string | undefined {
  if (!vercelHost) return undefined

  // 1. Estamos no host do próprio serviço (ex.: "arya-git-xyz.vercel.app").
  if (vercelHost.startsWith(`${service}-`)) {
    return `https://${vercelHost}`
  }

  // 2. Cross-service (ex.: "ned-git-xyz.vercel.app" -> "arya-git-xyz.vercel.app")
  const firstDot = vercelHost.indexOf('.')
  if (firstDot > 0 && vercelHost.includes('-')) {
    const [_, ...rest] = vercelHost.split('-')
    return `https://${service}-${rest.join('-')}`
  }

  // 3. Produção ou host custom – não há URL de preview a derivar.
  return undefined
}

// Calcula-se uma única vez durante o build; o resultado é serializado no bundle.
const preview: Record<Service, string | undefined> = {
  arya: derivePreviewUrl('arya'),
  bran: derivePreviewUrl('bran'),
  sansa: derivePreviewUrl('sansa'),
  ned: derivePreviewUrl('ned'),
}

function required(value: string | undefined, name: Service): string {
  if (value) return value
  throw new Error(`🛑 Missing URL for ${name}`)
}

// --- Variáveis fixas ---------------------------------------------------------
const rawFirebaseSA = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
const rawDatabaseUrl = process.env.DATABASE_URL

// Falha cedo apenas no servidor (para não quebrar o bundle do browser).
if (typeof window === 'undefined') {
  if (!rawFirebaseSA) {
    throw new Error('🛑 ENV VAR missing: FIREBASE_ADMIN_SERVICE_ACCOUNT')
  }
  if (!rawDatabaseUrl) {
    throw new Error('🛑 ENV VAR missing: DATABASE_URL')
  }
}

// --- createEnv --------------------------------------------------------------
export const env = createEnv({
  server: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string(),
    DATABASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_ARYA_URL: z.string().url(),
    NEXT_PUBLIC_BRAN_URL: z.string().url(),
    NEXT_PUBLIC_SANSA_URL: z.string().url(),
    NEXT_PUBLIC_NED_URL: z.string().url(),
  },
  runtimeEnv: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: rawFirebaseSA ?? '',
    DATABASE_URL: rawDatabaseUrl ?? '',
    NEXT_PUBLIC_ARYA_URL: required(
      process.env.NEXT_PUBLIC_ARYA_URL ?? preview.arya,
      'arya'
    ),
    NEXT_PUBLIC_BRAN_URL: required(
      process.env.NEXT_PUBLIC_BRAN_URL ?? preview.bran,
      'bran'
    ),
    NEXT_PUBLIC_SANSA_URL: required(
      process.env.NEXT_PUBLIC_SANSA_URL ?? preview.sansa,
      'sansa'
    ),
    NEXT_PUBLIC_NED_URL: required(
      process.env.NEXT_PUBLIC_NED_URL ?? preview.ned,
      'ned'
    ),
  },
})
