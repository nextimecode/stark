import admin from 'firebase-admin'

import { env } from '@/env'

if (typeof window !== 'undefined') {
  throw new Error('O Firebase Admin não pode ser executado no cliente.')
}

if (!env.FIREBASE_ADMIN_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export { admin }
