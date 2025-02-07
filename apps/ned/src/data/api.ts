/* eslint-disable no-undef */
import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_BRAN_URL
  console.error('baseUrl', baseUrl)
  if (!baseUrl) {
    throw new Error(
      'A variável de ambiente NEXT_PUBLIC_BRAN_URL não está definida.'
    )
  }
  // const apiPrefix = '/api'
  // const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(baseUrl, init)
}
