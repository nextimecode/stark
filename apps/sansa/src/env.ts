// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

type Service = 'arya' | 'bran' | 'sansa' | 'ned'

function derivePreviewUrl(service: Service): string | undefined {
  const host =
    process.env.VERCEL_BRANCH_URL ??
    process.env.VERCEL_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL
  if (!host || !host.includes('-git-')) return undefined
  if (host.startsWith(`${service}-`)) return `https://${host}`
  const i = host.indexOf('-')
  return i > 0 ? `https://${service}${host.slice(i)}` : undefined
}

function pick(service: Service): string {
  return (
    derivePreviewUrl(service) ??
    process.env[`NEXT_PUBLIC_${service.toUpperCase()}_URL`] ??
    (() => {
      throw new Error(`🛑 Missing URL for ${service}`)
    })()
  )
}

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
    NEXT_PUBLIC_ARYA_URL: pick('arya'),
    NEXT_PUBLIC_BRAN_URL: pick('bran'),
    NEXT_PUBLIC_SANSA_URL: pick('sansa'),
    NEXT_PUBLIC_NED_URL: pick('ned'),
  } as const,
})
