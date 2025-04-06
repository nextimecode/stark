import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

import { auth } from '@/firebase/client'
import { prisma } from '@/lib/prisma'

export async function signUpWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    await prisma.user.create({
      data: {
        firebaseId: user.uid,
        username: user.email?.split('@')[0] || '',
        name: user.displayName || '',
        email: user.email || '',
        emailVerified: user.emailVerified,
        picture: user.photoURL,
        provider: user.providerId,
        authTime: user.metadata.creationTime
          ? new Date(user.metadata.creationTime)
          : null
      }
    })

    return { success: true, user }
  } catch (error) {
    console.error('Error signup:', (error as Error).message)
    return {
      success: false,
      error:
        (error as Error).message || 'Erro desconhecido ao registrar o usuário.'
    }
  }
}

export async function signUpWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    await prisma.user.create({
      data: {
        firebaseId: user.uid,
        username: '',
        name: user.displayName || '',
        email: user.email || '',
        emailVerified: user.emailVerified,
        picture: user.photoURL,
        provider: user.providerId,
        authTime: user.metadata.creationTime
          ? new Date(user.metadata.creationTime)
          : null
      }
    })

    return { success: true, user }
  } catch (error) {
    console.error('Error signup:', (error as Error).message)
    return { success: false, error: (error as Error).message }
  }
}
