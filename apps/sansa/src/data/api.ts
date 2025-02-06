/* eslint-disable no-undef */
import { getBaseUrl } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = getBaseUrl().branUrl
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
