import { z } from 'zod'

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  PORT: z.coerce.number().optional().default(8000),
})

export type Env = z.infer<typeof envSchema>
