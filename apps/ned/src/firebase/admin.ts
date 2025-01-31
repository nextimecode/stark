import admin from 'firebase-admin'

export const getFirebaseAdmin = () => {
  if (!admin.apps.length) {
    const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT

    if (!serviceAccountKey) {
      throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
    }

    const serviceAccount = JSON.parse(serviceAccountKey)

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }

  return admin
}
