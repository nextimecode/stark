import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const replaceProjectName = (url: string, projectName: string) => {
  const replacedUrl = url.replace('name', projectName)
  console.error(`Replaced URL for ${projectName}:`, replacedUrl)
  return replacedUrl
}

const getBaseUrl = () => {
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  const previewUrl = process.env.NEXT_PUBLIC_VERCEL_PREVIEW_URL as string
  console.error('Is Preview Environment:', isPreview)

  if (isPreview && previewUrl) {
    console.error('Vercel Preview URL:', previewUrl)
    return {
      aryaUrl: replaceProjectName(previewUrl, 'arya'),
      branUrl: replaceProjectName(previewUrl, 'bran'),
      sansaUrl: replaceProjectName(previewUrl, 'sansa'),
      nedUrl: replaceProjectName(previewUrl, 'ned')
    }
  }
  return {
    aryaUrl: '',
    branUrl: '',
    sansaUrl: '',
    nedUrl: ''
  }
}

const { aryaUrl, branUrl, sansaUrl, nedUrl } = getBaseUrl()

export const env = createEnv({
  server: {
    VERCEL_GIT_COMMIT_REF: z.string(),
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string()
  },

  client: {
    NEXT_PUBLIC_VERCEL_ENV: z.string(),
    NEXT_PUBLIC_VERCEL_PREVIEW_URL: z.string(),
    NEXT_PUBLIC_ARYA_URL: z.string(),
    NEXT_PUBLIC_BRAN_URL: z.string(),
    NEXT_PUBLIC_SANSA_URL: z.string(),
    NEXT_PUBLIC_NED_URL: z.string()
  },

  runtimeEnv: {
    FIREBASE_ADMIN_SERVICE_ACCOUNT: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV || 'preview',
    NEXT_PUBLIC_VERCEL_PREVIEW_URL: process.env.VERCEL_GIT_COMMIT_REF
      ? `https://name-git-${process.env.VERCEL_GIT_COMMIT_REF}-nextimes-projects.vercel.app`
      : `https://name.nextime.com.br`,
    NEXT_PUBLIC_ARYA_URL: process.env.NEXT_PUBLIC_ARYA_URL || aryaUrl,
    NEXT_PUBLIC_BRAN_URL: process.env.NEXT_PUBLIC_BRAN_URL || branUrl,
    NEXT_PUBLIC_SANSA_URL: process.env.NEXT_PUBLIC_SANSA_URL || sansaUrl,
    NEXT_PUBLIC_NED_URL: process.env.NEXT_PUBLIC_NED_URL || nedUrl,
    VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF || ''
  }
})

console.error('Env Variables:', env)

console.error('Base URLs:', getBaseUrl())
