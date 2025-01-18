'use client'

import { firebase_app } from '@nextime/auth'

import {
  getAnalytics,
  Analytics,
  logEvent as firebaseLogEvent
} from 'firebase/analytics'

let analytics: Analytics | null = null

if (typeof window !== 'undefined' && firebase_app) {
  analytics = getAnalytics(firebase_app)
}

const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (!analytics) {
    console.error('Analytics não está configurado.')
    return
  }
  firebaseLogEvent(analytics, eventName, eventParams)
}

export { logEvent }
