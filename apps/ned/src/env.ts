// arya/src/env.ts

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ARYA_URL: z.string(),
    NEXT_PUBLIC_NED_URL: z.string(),
    NEXT_PUBLIC_SANSA_URL: z.string()
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    FIREBASE_ADMIN_SERVICE_ACCOUNT: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT,
    NEXT_PUBLIC_ARYA_URL: process.env.NEXT_PUBLIC_ARYA_URL,
    NEXT_PUBLIC_NED_URL: process.env.NEXT_PUBLIC_NED_URL,
    NEXT_PUBLIC_SANSA_URL: process.env.NEXT_PUBLIC_SANSA_URL
  },
  server: {
    DATABASE_URL: z.string(),
    FIREBASE_ADMIN_SERVICE_ACCOUNT: z.string()
  }
})
