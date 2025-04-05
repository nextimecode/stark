import { createBrowserClient } from '@supabase/ssr'

import type { Database } from '@/lib/supabase/database.types'

// Create a single supabase client for the entire client-side application
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null =
  null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabaseClient
}
