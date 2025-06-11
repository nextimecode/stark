import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const SERVICES = ['arya', 'bran', 'sansa', 'ned'] as const
type ServiceKey = `${Uppercase<(typeof SERVICES)[number]>}_URL`

function derivePreview(host: string): Record<ServiceKey, string> {
  const [, suffix] = host
    .replace(/^https?:\/\//, '')
    .replace('.vercel.app', '')
    .split('-git-')
  if (!suffix) return {} as Record<ServiceKey, string>
  return Object.fromEntries(
    SERVICES.map(s => [
      `${s.toUpperCase()}_URL`,
      `https://${s}-git-${suffix}.vercel.app`,
    ])
  ) as Record<ServiceKey, string>
}

const host =
  process.env.VERCEL_ENV === 'preview' ? (process.env.VERCEL_URL ?? '') : ''
const previewUrls = host ? derivePreview(host) : {}

const baseUrls = Object.fromEntries(
  SERVICES.map(s => [
    `${s.toUpperCase()}_URL`,
    process.env[`NEXT_PUBLIC_${s.toUpperCase()}_URL`] ?? '',
  ])
) as Record<ServiceKey, string>

const urls =
  Object.keys(previewUrls).length === SERVICES.length
    ? { ...baseUrls, ...previewUrls }
    : baseUrls

export const env = createEnv({
  server: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string(),
    DATABASE_URL: z.string().url(),
    OPENAI_API_KEY: z.string(),
    ARYA_URL: z.string().url(),
    BRAN_URL: z.string().url(),
    SANSA_URL: z.string().url(),
    NED_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_ARYA_URL: z.string().url(),
    NEXT_PUBLIC_BRAN_URL: z.string().url(),
    NEXT_PUBLIC_SANSA_URL: z.string().url(),
    NEXT_PUBLIC_NED_URL: z.string().url(),
  },
  runtimeEnv: {
    ...process.env,
    FIREBASE_ADMIN_SERVICE_ACCOUNT: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT,
    DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ARYA_URL: urls.ARYA_URL,
    BRAN_URL: urls.BRAN_URL,
    SANSA_URL: urls.SANSA_URL,
    NED_URL: urls.NED_URL,
    NEXT_PUBLIC_ARYA_URL: urls.ARYA_URL,
    NEXT_PUBLIC_BRAN_URL: urls.BRAN_URL,
    NEXT_PUBLIC_SANSA_URL: urls.SANSA_URL,
    NEXT_PUBLIC_NED_URL: urls.NED_URL,
  },
})
