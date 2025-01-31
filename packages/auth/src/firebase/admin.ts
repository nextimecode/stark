import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { join } from 'path'

const serviceAccountKeyPath = join(process.cwd(), 'serviceAccountKey.json')
const serviceAccountKey = JSON.parse(
  readFileSync(serviceAccountKeyPath, 'utf8')
)

if (typeof window !== 'undefined') {
  throw new Error('O Firebase Admin não pode ser executado no cliente.')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  })
}

export { admin }
