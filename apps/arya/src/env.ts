// src/env.ts

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const vercelHost = process.env.VERCEL_URL
console.log('🔍 Vercel Host:', vercelHost)

const rawFirebaseSA = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
const rawArya = process.env.NEXT_PUBLIC_ARYA_URL
const rawBran = process.env.NEXT_PUBLIC_BRAN_URL
const rawSansa = process.env.NEXT_PUBLIC_SANSA_URL
const rawNed = process.env.NEXT_PUBLIC_NED_URL

if (typeof window === 'undefined') {
  if (!rawFirebaseSA) {
    throw new Error('🛑 ENV VAR missing: FIREBASE_ADMIN_SERVICE_ACCOUNT')
  }
}

function derivePreviewUrl(
  service: 'arya' | 'bran' | 'sansa' | 'ned'
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

function pickUrl(
  service: 'arya' | 'bran' | 'sansa' | 'ned',
  base?: string
): string {
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
  },
})
