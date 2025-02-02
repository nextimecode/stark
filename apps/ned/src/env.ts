import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    VERCEL_URL: z.string().optional(),
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string().optional()
  },

  client: {
    NEXT_PUBLIC_VERCEL_ENV: z.string().optional(),
    NEXT_PUBLIC_VERCEL_URL: z.string().url().optional(),
    NEXT_PUBLIC_ARYA_URL: z.string().url().optional(),
    NEXT_PUBLIC_BRAN_URL: z.string().url().optional(),
    NEXT_PUBLIC_SANSA_URL: z.string().url().optional(),
    NEXT_PUBLIC_NED_URL: z.string().url().optional()
  },

  runtimeEnv: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined,
    NEXT_PUBLIC_ARYA_URL: process.env.NEXT_PUBLIC_ARYA_URL,
    NEXT_PUBLIC_BRAN_URL: process.env.NEXT_PUBLIC_BRAN_URL,
    NEXT_PUBLIC_SANSA_URL: process.env.NEXT_PUBLIC_SANSA_URL,
    NEXT_PUBLIC_NED_URL: process.env.NEXT_PUBLIC_NED_URL,
    VERCEL_URL: process.env.VERCEL_URL
  }
})

const replaceSubdomain = (url: string, newSubdomain: string) => {
  return url.replace(/\/\/[^-]+-/, `//${newSubdomain}-`)
}

export const getBaseUrl = () => {
  const branchUrl = process.env.VERCEL_BRANCH_URL
  const projectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'

  console.error('branchUrl', branchUrl)
  console.error('projectProductionUrl', projectProductionUrl)
  console.error('isPreview', isPreview)

  if (isPreview && branchUrl && projectProductionUrl) {
    return {
      aryaUrl: `https://arya-${branchUrl}`,
      branUrl: `https://bran-${branchUrl}`,
      sansaUrl: `https://sansa-${branchUrl}`,
      nedUrl: `https://ned-${branchUrl}`
    }
  }

  return {
    aryaUrl: process.env.NEXT_PUBLIC_ARYA_URL || '',
    branUrl: process.env.NEXT_PUBLIC_BRAN_URL || '',
    sansaUrl: process.env.NEXT_PUBLIC_SANSA_URL || '',
    nedUrl: process.env.NEXT_PUBLIC_NED_URL || ''
  }
}
