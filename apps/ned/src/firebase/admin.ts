export const dynamic = 'force-dynamic'

import firebaseAdminLib from 'firebase-admin'

const getFirebaseAdmin = () => {
  const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
  }

  if (!firebaseAdminLib.apps.length) {
    const serviceAccount = JSON.parse(serviceAccountKey)

    firebaseAdminLib.initializeApp({
      credential: firebaseAdminLib.credential.cert(serviceAccount),
    })
  }
  return { admin: firebaseAdminLib, key: serviceAccountKey }
}

export const { admin, key } = getFirebaseAdmin()
