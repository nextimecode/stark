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

  // 1. Exact match: we are already on the requested service host.
  //    Example: "arya-git-feature-123.vercel.app"
  if (vercelHost.startsWith(`${service}-`)) {
    return `https://${vercelHost}`
  }

  // 2. Generic cross-service preview: substitute the *first* sub-domain segment
  //    by the desired service, keeping the rest intact.
  //    Works for any preview naming strategy, e.g.:
  //      "ned-git-feature-123.vercel.app"  -> "arya-git-feature-123.vercel.app"
  //      "ned-pr-456.vercel.app"          -> "arya-pr-456.vercel.app"
  //    Skip when host seems to be production (no dash) to avoid false positives.
  const firstDot = vercelHost.indexOf('.')
  if (firstDot > 0 && vercelHost.includes('-')) {
    const subdomain = vercelHost.slice(0, firstDot)
    const rest = vercelHost.slice(firstDot) // includes leading '.'

    const subdomainSegments = subdomain.split('-')
    if (subdomainSegments.length > 1) {
      subdomainSegments[0] = service
      return `https://${subdomainSegments.join('-')}${rest}`
    }
  }

  // 3. Non-preview (production/custom) – unable to derive automatically.
  return
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
