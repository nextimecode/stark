import {
  getAnalytics,
  Analytics,
  logEvent as firebaseLogEvent
} from 'firebase/analytics'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

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

const auth = getAuth(firebase_app)

export { firebase_app, analytics, logEvent, auth, onAuthStateChanged, User }
