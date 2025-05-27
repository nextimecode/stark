// firebase/auth/index.ts

export * from './register'
export * from './sign-in'

export { sendPasswordResetEmail } from '@/firebase/client'
export type { User as FirebaseUser } from '@/firebase/client'
