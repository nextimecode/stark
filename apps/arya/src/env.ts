// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// Host gerado pela Vercel em preview ou production (ex: "ned-git-xyz.vercel.app")
const vercelHost = process.env.VERCEL_URL

// Variáveis fixas definidas em .env/.env.local ou no painel Vercel (produção)
const rawFirebaseSA = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
const rawArya = process.env.NEXT_PUBLIC_ARYA_URL
const rawBran = process.env.NEXT_PUBLIC_BRAN_URL
const rawSansa = process.env.NEXT_PUBLIC_SANSA_URL
const rawNed = process.env.NEXT_PUBLIC_NED_URL

// --- validações SERVER-ONLY (evita break no client/browser) ---
if (typeof window === 'undefined') {
  if (!rawFirebaseSA) {
    throw new Error('🛑 ENV VAR missing: FIREBASE_ADMIN_SERVICE_ACCOUNT')
  }
}

// --- monta URLs de preview dinamicamente (só para branches de preview) ---
function derivePreviewUrl(
  service: 'arya' | 'bran' | 'sansa' | 'ned'
): string | undefined {
  if (!vercelHost) return
  // preview hosts são no formato "<service>-<branch>.vercel.app"
  if (vercelHost.startsWith(`${service}-`)) {
    return `https://${vercelHost}`
  }
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
