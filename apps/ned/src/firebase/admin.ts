export const dynamic = 'force-dynamic'

import admin from 'firebase-admin'

export const getFirebaseAdmin = () => {
  const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
  }

  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(serviceAccountKey)
    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      '\n'
    )

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }
  const key = serviceAccountKey

  return { admin, key }
}
