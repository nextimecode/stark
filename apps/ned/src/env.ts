// arya/src/env.ts

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

type Service = 'arya' | 'bran' | 'sansa' | 'ned'

function derivePreviewUrl(service: Service): string | undefined {
  const host = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL
  if (!host) return undefined
  if (host.startsWith(`${service}-`)) return `https://${host}`
  const i = host.indexOf('-')
  return i > 0 ? `https://${service}${host.slice(i)}` : undefined
}

function baseEnv(service: Service): string | undefined {
  return process.env[`NEXT_PUBLIC_${service.toUpperCase()}_URL`] as
    | string
    | undefined
}

function pickUrl(service: Service): string {
  return (
    derivePreviewUrl(service) ??
    baseEnv(service) ??
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
    NEXT_PUBLIC_ARYA_URL: pickUrl('arya'),
    NEXT_PUBLIC_BRAN_URL: pickUrl('bran'),
    NEXT_PUBLIC_SANSA_URL: pickUrl('sansa'),
    NEXT_PUBLIC_NED_URL: pickUrl('ned'),
  } as const,
})
