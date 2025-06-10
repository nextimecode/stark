// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// --- Types & helpers --------------------------------------------------------

type Service = 'arya' | 'bran' | 'sansa' | 'ned'

function derivePreviewUrl(service: Service): string | undefined {
  const host = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL
  if (!host) return undefined
  if (host.startsWith(`${service}-`)) return `https://${host}`
  const gitIdx = host.indexOf('-git-')
  if (gitIdx >= 0) return `https://${service}${host.slice(gitIdx)}`
  return undefined
}

// Calcula-se uma única vez durante o build; o resultado é serializado no bundle.
const preview = {
  arya: derivePreviewUrl('arya'),
  bran: derivePreviewUrl('bran'),
  sansa: derivePreviewUrl('sansa'),
  ned: derivePreviewUrl('ned'),
} as const satisfies Record<Service, string | undefined>

function required(url: string | undefined, service: Service): string {
  if (url) return url
  throw new Error(`🛑 Missing URL for ${service}`)
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
