import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/supabase/database.types'

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          // https://supabase.com/docs/guides/platform/read-replicas#experimental-routing
          'sb-lb-routing-mode': 'alpha-all-services'
        }
      }
    }
  )
}
