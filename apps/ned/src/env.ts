// env.ts

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_ARYA_URL: z.string().url(),
    NEXT_PUBLIC_BRAN_URL: z.string().url(),
    NEXT_PUBLIC_SANSA_URL: z.string().url(),
    NEXT_PUBLIC_NED_URL: z.string().url()
  },

  runtimeEnv: {
    NEXT_PUBLIC_ARYA_URL: process.env.NEXT_PUBLIC_ARYA_URL,
    NEXT_PUBLIC_BRAN_URL: process.env.NEXT_PUBLIC_BRAN_URL,
    NEXT_PUBLIC_SANSA_URL: process.env.NEXT_PUBLIC_SANSA_URL,
    NEXT_PUBLIC_NED_URL: process.env.NEXT_PUBLIC_NED_URL
  }
})
