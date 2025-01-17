// Import the functions you need from the SDKs you need
import {
  getAnalytics,
  Analytics,
  logEvent as firebaseLogEvent
} from 'firebase/analytics'
import { initializeApp, getApps } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

let analytics: Analytics | null = null
if (typeof window !== 'undefined' && firebase_app) {
  analytics = getAnalytics(firebase_app)
}

const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (!analytics) {
    throw new Error('Analytics não está configurado.')
  }
  firebaseLogEvent(analytics, eventName, eventParams)
}

export { firebase_app, analytics, logEvent }
