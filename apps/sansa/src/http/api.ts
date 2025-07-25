/* eslint-disable no-redeclare */

/**
 * @nullable
 */
export type AccessInviteLink301 =
  | (typeof AccessInviteLink301)[keyof typeof AccessInviteLink301]
  | null

export type SubscribeToEvent201 = {
  subscriberId: string
}

/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * NLW Connect
 * OpenAPI spec version: 0.1
 */
export type SubscribeToEventBody = {
  email: string
  name: string
  /** @nullable */
  referrer?: null | string
}

export const AccessInviteLink301 = {
  null: 'null'
} as const

export type GetRanking200 = {
  ranking: GetRanking200RankingItem[]
}

export type GetRanking200RankingItem = {
  id: string
  name: string
  score: number
}

export type GetSubscriberInviteClicks200 = {
  count: number
}

export type GetSubscriberInviteCount200 = {
  count: number
}

export type GetSubscriberRankingPosition200 = {
  /** @nullable */
  position: null | number
}

/**
 * @summary Subscribe to event
 */
export const getSubscribeToEventUrl = () => {
  return `http://localhost:3333/subscriptions`
}

export const subscribeToEvent = async (
  subscribeToEventBody: SubscribeToEventBody,
  options?: RequestInit
): Promise<SubscribeToEvent201> => {
  const res = await fetch(getSubscribeToEventUrl(), {
    ...options,
    body: JSON.stringify(subscribeToEventBody),
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    method: 'POST'
  })

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: SubscribeToEvent201 = body ? JSON.parse(body) : {}

  return data
}

/**
 * @summary Access invite link
 */
export const getAccessInviteLinkUrl = (subscriberId: string) => {
  return `http://localhost:3333/invites/${subscriberId}`
}

export const accessInviteLink = async (
  subscriberId: string,
  options?: RequestInit
): Promise<unknown> => {
  const res = await fetch(getAccessInviteLinkUrl(subscriberId), {
    ...options,
    method: 'GET'
  })

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: unknown = body ? JSON.parse(body) : {}

  return data
}

/**
 * @summary Get ranking
 */
export const getGetRankingUrl = () => {
  return `http://localhost:3333/ranking`
}

export const getRanking = async (
  options?: RequestInit
): Promise<GetRanking200> => {
  const res = await fetch(getGetRankingUrl(), {
    ...options,
    method: 'GET'
  })

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: GetRanking200 = body ? JSON.parse(body) : {}

  return data
}

/**
 * @summary Get subscriber ranking invites count
 */
export const getGetSubscriberInviteCountUrl = (subscriberId: string) => {
  return `http://localhost:3333/subscribers/${subscriberId}/ranking/count`
}

export const getSubscriberInviteCount = async (
  subscriberId: string,
  options?: RequestInit
): Promise<GetSubscriberInviteCount200> => {
  const res = await fetch(getGetSubscriberInviteCountUrl(subscriberId), {
    ...options,
    method: 'GET'
  })

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: GetSubscriberInviteCount200 = body ? JSON.parse(body) : {}

  return data
}

/**
 * @summary Get subscriber ranking invites clicks count
 */
export const getGetSubscriberInviteClicksUrl = (subscriberId: string) => {
  return `http://localhost:3333/subscribers/${subscriberId}/ranking/clicks`
}

export const getSubscriberInviteClicks = async (
  subscriberId: string,
  options?: RequestInit
): Promise<GetSubscriberInviteClicks200> => {
  const res = await fetch(getGetSubscriberInviteClicksUrl(subscriberId), {
    ...options,
    method: 'GET'
  })

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: GetSubscriberInviteClicks200 = body ? JSON.parse(body) : {}

  return data
}

/**
 * @summary Get subscriber ranking position
 */
export const getGetSubscriberRankingPositionUrl = (subscriberId: string) => {
  return `http://localhost:3333/subscribers/${subscriberId}/ranking/position`
}

export const getSubscriberRankingPosition = async (
  subscriberId: string,
  options?: RequestInit
): Promise<GetSubscriberRankingPosition200> => {
  const res = await fetch(getGetSubscriberRankingPositionUrl(subscriberId), {
    ...options,
    method: 'GET'
  })

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: GetSubscriberRankingPosition200 = body ? JSON.parse(body) : {}

  return data
}
