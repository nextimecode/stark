import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_VERCEL_ENV: z.string().optional()
  },

  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().url().optional(),
    NEXT_PUBLIC_ARYA_URL: z.string().url().optional(),
    NEXT_PUBLIC_BRAN_URL: z.string().url().optional(),
    NEXT_PUBLIC_SANSA_URL: z.string().url().optional(),
    NEXT_PUBLIC_NED_URL: z.string().url().optional()
  },

  runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_ARYA_URL: process.env.NEXT_PUBLIC_ARYA_URL,
    NEXT_PUBLIC_BRAN_URL: process.env.NEXT_PUBLIC_BRAN_URL,
    NEXT_PUBLIC_SANSA_URL: process.env.NEXT_PUBLIC_SANSA_URL,
    NEXT_PUBLIC_NED_URL: process.env.NEXT_PUBLIC_NED_URL,
    VERCEL_URL: process.env.VERCEL_URL
  }
})

export const getBaseUrl = () => {
  const vercelUrl = env.NEXT_PUBLIC_VERCEL_URL
  const isPreview = env.NEXT_PUBLIC_VERCEL_ENV === 'preview'

  console.error('vercelUrl', vercelUrl)
  console.error('isPreview', isPreview)

  if (isPreview && vercelUrl) {
    return {
      aryaUrl: `https://arya-${vercelUrl}`,
      branUrl: `https://bran-${vercelUrl}`,
      sansaUrl: `https://sansa-${vercelUrl}`,
      nedUrl: `https://ned-${vercelUrl}`
    }
  }

  return {
    aryaUrl: env.NEXT_PUBLIC_ARYA_URL || '',
    branUrl: env.NEXT_PUBLIC_BRAN_URL || '',
    sansaUrl: env.NEXT_PUBLIC_SANSA_URL || '',
    nedUrl: env.NEXT_PUBLIC_NED_URL || ''
  }
}
