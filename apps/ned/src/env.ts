// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

type Service = 'arya' | 'bran' | 'sansa' | 'ned'

function resolveServiceUrl(service: Service): string {
  const envKey = `NEXT_PUBLIC_${service.toUpperCase()}_URL`
  const fixedUrl = process.env[envKey]

  if (typeof window !== 'undefined') {
    if (!fixedUrl) {
      throw new Error(`Missing URL for ${service}`)
    }
    return fixedUrl
  }

  const vercelBranchUrl = process.env.VERCEL_BRANCH_URL
  const vercelUrl = process.env.VERCEL_URL

  if (vercelBranchUrl?.includes('-git-')) {
    const dashIndex = vercelBranchUrl.indexOf('-')
    if (dashIndex > 0) {
      const suffix = vercelBranchUrl.slice(dashIndex)
      return `https://${service}${suffix}`
    }
  }

  if (vercelUrl?.includes('-git-')) {
    const dashIndex = vercelUrl.indexOf('-')
    if (dashIndex > 0) {
      const suffix = vercelUrl.slice(dashIndex)
      return `https://${service}${suffix}`
    }
  }

  if (fixedUrl) {
    return fixedUrl
  }

  throw new Error(`Missing URL for ${service}`)
}

const services: Service[] = ['arya', 'bran', 'sansa', 'ned']
const resolvedUrls: Record<Service, string> = {} as Record<Service, string>

if (typeof window === 'undefined') {
  for (const service of services) {
    const url = resolveServiceUrl(service)
    resolvedUrls[service] = url
    process.env[`NEXT_PUBLIC_${service.toUpperCase()}_URL`] = url
  }
} else {
  for (const service of services) {
    const envKey = `NEXT_PUBLIC_${service.toUpperCase()}_URL`
    const url = process.env[envKey]
    if (!url) {
      throw new Error(`Missing URL for ${service}`)
    }
    resolvedUrls[service] = url
  }
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
    NEXT_PUBLIC_ARYA_URL: resolvedUrls.arya,
    NEXT_PUBLIC_BRAN_URL: resolvedUrls.bran,
    NEXT_PUBLIC_SANSA_URL: resolvedUrls.sansa,
    NEXT_PUBLIC_NED_URL: resolvedUrls.ned,
  },
})
