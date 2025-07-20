'use client'

import {
  type FirebaseOptions,
  getApp,
  getApps,
  initializeApp
} from 'firebase/app'
import {
  type Auth,
  browserLocalPersistence,
  getAuth,
  setPersistence
} from 'firebase/auth'

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

if (
  !apiKey ||
  !authDomain ||
  !projectId ||
  !storageBucket ||
  !messagingSenderId ||
  !appId
) {
  throw new Error('🛑 Missing one or more Firebase environment variables')
}

const config: FirebaseOptions = {
  apiKey,
  appId,
  authDomain,
  measurementId,
  messagingSenderId,
  projectId,
  storageBucket
}

function initAuth(): Auth {
  const app = getApps().length > 0 ? getApp() : initializeApp(config)
  const auth = getAuth(app)
  void setPersistence(auth, browserLocalPersistence)
  return auth
}

export const auth = initAuth()

export {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential
} from 'firebase/auth'
