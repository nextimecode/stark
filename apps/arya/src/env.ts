// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

type Service = 'arya' | 'bran' | 'sansa' | 'ned'
const isServer = typeof window === 'undefined'

function rawHost(): string | undefined {
  return (
    process.env.VERCEL_BRANCH_URL ??
    process.env.VERCEL_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL
  )
}

function derivePreviewUrl(service: Service): string | undefined {
  if (!isServer) return undefined // nunca roda no browser
  const host = rawHost()
  if (!host || !host.includes('-git-')) return undefined
  if (host.startsWith(`${service}-`)) return `https://${host}`
  const i = host.indexOf('-')
  return i > 0 ? `https://${service}${host.slice(i)}` : undefined
}

function pick(service: Service): string {
  const envFixed = process.env[`NEXT_PUBLIC_${service.toUpperCase()}_URL`]
  const url = derivePreviewUrl(service) ?? envFixed
  if (url) return url
  throw new Error(`🛑 Missing URL for ${service}`)
}

/* ---------- resolve todas as URLs no servidor ---------- */
const RESOLVED = {
  arya: pick('arya'),
  bran: pick('bran'),
  sansa: pick('sansa'),
  ned: pick('ned'),
} as const satisfies Record<Service, string>

/* ---------- garante que o browser receba as variáveis ---------- */
for (const [k, v] of Object.entries(RESOLVED)) {
  process.env[`NEXT_PUBLIC_${k.toUpperCase()}_URL`] ??= v
}

/* ---------- createEnv ---------- */
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
    FIREBASE_ADMIN_SERVICE_ACCOUNT:
      process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT ?? '',
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    NEXT_PUBLIC_ARYA_URL: RESOLVED.arya,
    NEXT_PUBLIC_BRAN_URL: RESOLVED.bran,
    NEXT_PUBLIC_SANSA_URL: RESOLVED.sansa,
    NEXT_PUBLIC_NED_URL: RESOLVED.ned,
  } as const,
})
