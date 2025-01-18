import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

import { firebase_app } from '@/firebase/config'

const auth = getAuth(firebase_app)

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

    return { success: true, user }
  } catch (error) {
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

    return { success: true, user }
  } catch (error) {
    console.error('Error signup:', (error as Error).message)
    return { success: false, error }
  }
}
