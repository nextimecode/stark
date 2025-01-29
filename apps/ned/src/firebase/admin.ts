import admin from 'firebase-admin'

import { env } from '@/env'

// Certifique-se de que a variável de ambiente existe
if (!env.FIREBASE_ADMIN_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
}

// Parse na string JSON da variável de ambiente
const serviceAccount = JSON.parse(env.FIREBASE_ADMIN_SERVICE_ACCOUNT)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export { admin }
