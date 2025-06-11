// ned/src/env.ts

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const vercelHost = process.env.VERCEL_URL
console.log('🔍 Vercel Host:', vercelHost)

const rawFirebaseSA = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
const rawDatabaseURL = process.env.DATABASE_URL
const rawArya = process.env.NEXT_PUBLIC_ARYA_URL
const rawSansa = process.env.NEXT_PUBLIC_SANSA_URL
const rawNed = process.env.NEXT_PUBLIC_NED_URL

if (typeof window === 'undefined') {
  if (!rawFirebaseSA) {
    throw new Error('🛑 ENV VAR missing: FIREBASE_ADMIN_SERVICE_ACCOUNT')
  }
  if (!rawDatabaseURL) {
    throw new Error('🛑 ENV VAR missing: DATABASE_URL')
  }
}

function derivePreviewUrl(
  service: 'arya' | 'sansa' | 'ned'
): string | undefined {
  if (!vercelHost) {
    console.log(`⚠️ No Vercel host found for ${service}`)
    return
  }
  if (vercelHost.startsWith(`${service}-`)) {
    const previewUrl = `https://${vercelHost}`
    console.log(`✅ Preview URL for ${service}:`, previewUrl)
    return previewUrl
  }
  console.log(`❌ No preview URL match for ${service} in host:`, vercelHost)
}

function pickUrl(service: 'arya' | 'sansa' | 'ned', base?: string): string {
  const preview = derivePreviewUrl(service)
  const finalUrl =
    preview ??
    base ??
    (() => {
      throw new Error(`🛑 Missing URL for ${service}`)
    })()
  console.log(`🎯 Final URL for ${service}:`, finalUrl)
  return finalUrl
}

export const env = createEnv({
  server: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string(),
    DATABASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_ARYA_URL: z.string(),
    NEXT_PUBLIC_SANSA_URL: z.string(),
    NEXT_PUBLIC_NED_URL: z.string(),
  },
  runtimeEnv: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: rawFirebaseSA ?? '',
    DATABASE_URL: rawDatabaseURL ?? '',
    NEXT_PUBLIC_ARYA_URL: pickUrl('arya', rawArya),
    NEXT_PUBLIC_SANSA_URL: pickUrl('sansa', rawSansa),
    NEXT_PUBLIC_NED_URL: pickUrl('ned', rawNed),
  },
})
