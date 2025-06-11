export const dynamic = 'force-dynamic'

import type { ServiceAccount } from 'firebase-admin'
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { type Auth, getAuth } from 'firebase-admin/auth'

function initAuth(): Auth {
  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          credential: cert(
            JSON.parse(
              Buffer.from(
                process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT as string,
                'base64'
              ).toString('utf8')
            ) as ServiceAccount
          ),
        })

  return getAuth(app)
}

export const adminAuth = initAuth()
