import type { Database } from '@/lib/supabase/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { cookies } from 'next/headers'

// For App Router (Server Components)
export const getSupabaseServer = () => {
  // Dynamic import to avoid loading next/headers in the Pages Router
  const { cookies } = require('next/headers')
  return createServerComponentClient<Database>({ cookies })
}

// For API Routes and Pages Router
export const getSupabaseServerClient = (
  cookieStore: ReturnType<typeof cookies>
) => {
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}
