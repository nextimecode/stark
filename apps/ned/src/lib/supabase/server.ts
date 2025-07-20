// src/lib/supabase/server.ts

import type { Database } from '@/lib/supabase/database.types'
import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'

export type CreateClientOptions = {
  admin?: boolean
}

export async function createClient(opts?: CreateClientOptions) {
  const { admin = false } = opts ?? {}

  // 1) Validação das ENV vars
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!url) {
    throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_URL')
  }

  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!anonKey) {
    throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  const key = admin
    ? (process.env.SUPABASE_SERVICE_KEY ??
      (() => {
        throw new Error('Missing env var: SUPABASE_SERVICE_KEY')
      })())
    : anonKey

  // 2) Leia cookies e headers (async!)
  const cookieStore = await cookies()
  const headerStore = await headers()

  // 3) Cria o client sem 'schema' e com new cookieMethods
  return createServerClient<Database>(url, key, {
    auth: admin
      ? {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false
        }
      : undefined,
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, options, value } of cookiesToSet) {
          cookieStore.set(name, value, options)
        }
      }
    },
    global: {
      headers: {
        'sb-lb-routing-mode': 'alpha-all-services',
        'user-agent': headerStore.get('user-agent') ?? ''
      }
    }
  })
}
