// arya/src/env.ts

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

type Service = 'arya' | 'bran' | 'sansa' | 'ned'

function derivePreviewUrl(service: Service): string | undefined {
  const host = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL
  if (!host) return undefined
  if (host.startsWith(`${service}-`)) return `https://${host}`
  const firstDash = host.indexOf('-')
  return firstDash > 0
    ? `https://${service}${host.slice(firstDash)}`
    : undefined
}

const preview = {
  arya: derivePreviewUrl('arya'),
  bran: derivePreviewUrl('bran'),
  sansa: derivePreviewUrl('sansa'),
  ned: derivePreviewUrl('ned'),
} as const satisfies Record<Service, string | undefined>

function required(url: string | undefined, service: Service): string {
  if (url) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[${service}] Using URL:`, url)
    }
    return url
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${service}] Missing URL - Environment variables:`, {
      NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
      VERCEL_URL: process.env.VERCEL_URL,
      [`NEXT_PUBLIC_${service.toUpperCase()}_URL`]:
        process.env[`NEXT_PUBLIC_${service.toUpperCase()}_URL`],
    })
  }

  throw new Error(`🛑 Missing URL for ${service}`)
}

const rawFirebaseSA = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
const rawDatabaseUrl = process.env.DATABASE_URL

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running server-side environment validation')
  }

  if (!rawFirebaseSA) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Missing Firebase Service Account configuration')
    }
    throw new Error('🛑 ENV VAR missing: FIREBASE_ADMIN_SERVICE_ACCOUNT')
  }

  if (!rawDatabaseUrl) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Missing Database URL configuration')
    }
    throw new Error('🛑 ENV VAR missing: DATABASE_URL')
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('Server-side environment validation passed')
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Initializing environment configuration')
}

const runtimeEnv = {
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
} as const

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
  runtimeEnv,
})

if (process.env.NODE_ENV !== 'production') {
  console.log('Environment configuration initialized successfully')
}
