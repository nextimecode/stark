// firebase/config.ts
export const dynamic = 'force-dynamic'

import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  type User,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

const getFirebaseClient = () => {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error('Variáveis de ambiente do Firebase não estão definidas.')
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  const firebaseApp =
    getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)

  setPersistence(auth, browserLocalPersistence).catch(error => {
    console.error('Erro ao configurar persistência:', error)
  })

  return { firebaseApp, auth }
}

export const { firebaseApp, auth } = getFirebaseClient()
export { onAuthStateChanged, type User }
