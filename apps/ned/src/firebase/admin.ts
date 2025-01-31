import admin from 'firebase-admin'

export const getFirebaseAdmin = () => {
  const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
  }

  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(serviceAccountKey)

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }
  const key = serviceAccountKey.slice(5)

  return { admin, key }
}
