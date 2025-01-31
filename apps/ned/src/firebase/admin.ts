import admin from 'firebase-admin'

export const getFirebaseAdmin = () => {
  const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
  if (!admin.apps.length) {
    if (!serviceAccountKey) {
      throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
    }

    const serviceAccount = JSON.parse(serviceAccountKey)

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }
  const key = serviceAccountKey.slice(5)

  return { admin, key }
}
