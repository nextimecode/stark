'use client'

import {
  type Analytics,
  logEvent as firebaseLogEvent,
  getAnalytics,
} from 'firebase/analytics'
import { getApps, initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

let analytics: Analytics | null = null

if (firebase_app) {
  analytics = getAnalytics(firebase_app)
}

const logEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (!analytics) {
    console.error('Analytics não está configurado.')
    return {
      success: false,
      message: 'Analytics não está configurado.',
      error: 'Internal Server Error',
      statusCode: 500,
    }
  }
  try {
    firebaseLogEvent(analytics, eventName, eventParams)
    return {
      success: true,
      message: 'Evento registrado com sucesso.',
      statusCode: 200,
    }
  } catch (error) {
    console.error('Erro ao registrar o evento:', error)
    return {
      success: false,
      message: 'Erro ao registrar o evento.',
      error: 'Bad Request',
      statusCode: 400,
    }
  }
}

export { logEvent }
