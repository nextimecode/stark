// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const rawFirebaseSA = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
const rawArya = process.env.NEXT_PUBLIC_ARYA_URL
const rawBran = process.env.NEXT_PUBLIC_BRAN_URL
const rawSansa = process.env.NEXT_PUBLIC_SANSA_URL
const rawNed = process.env.NEXT_PUBLIC_NED_URL
const vercelHost = process.env.VERCEL_URL

if (!rawFirebaseSA) {
  throw new Error('🛑 ENV VAR missing: FIREBASE_ADMIN_SERVICE_ACCOUNT')
}
if (!rawArya) {
  throw new Error('🛑 ENV VAR missing: NEXT_PUBLIC_ARYA_URL')
}
if (!rawBran) {
  throw new Error('🛑 ENV VAR missing: NEXT_PUBLIC_BRAN_URL')
}
if (!rawSansa) {
  throw new Error('🛑 ENV VAR missing: NEXT_PUBLIC_SANSA_URL')
}
if (!rawNed) {
  throw new Error('🛑 ENV VAR missing: NEXT_PUBLIC_NED_URL')
}

function derivePreviewUrl(
  service: 'arya' | 'bran' | 'sansa' | 'ned'
): string | undefined {
  if (!vercelHost) return undefined
  const expectedPrefix = `${service}-`
  if (vercelHost.startsWith(expectedPrefix)) {
    return `https://${vercelHost}`
  }
  return undefined
}

function pickUrl(
  service: 'arya' | 'bran' | 'sansa' | 'ned',
  base: string
): string {
  const preview = derivePreviewUrl(service)
  return preview ?? base
}

export const env = createEnv({
  server: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string(),
  },
  client: {
    NEXT_PUBLIC_ARYA_URL: z.string(),
    NEXT_PUBLIC_BRAN_URL: z.string(),
    NEXT_PUBLIC_SANSA_URL: z.string(),
    NEXT_PUBLIC_NED_URL: z.string(),
  },
  runtimeEnv: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: rawFirebaseSA,
    NEXT_PUBLIC_ARYA_URL: pickUrl('arya', rawArya),
    NEXT_PUBLIC_BRAN_URL: pickUrl('bran', rawBran),
    NEXT_PUBLIC_SANSA_URL: pickUrl('sansa', rawSansa),
    NEXT_PUBLIC_NED_URL: pickUrl('ned', rawNed),
  },
})
