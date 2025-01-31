// firebase/admin.ts

import admin from 'firebase-admin'

if (typeof window !== 'undefined') {
  throw new Error('O Firebase Admin não pode ser executado no cliente.')
}
var serviceAccountKey = require('./serviceAccountKey.json')

// if (!serviceAccountKey) {
//   throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT não está definida.')
// }

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  })
}

export { admin }
