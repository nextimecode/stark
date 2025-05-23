import type { FirebaseError } from 'firebase/app'
import type { User } from 'firebase/auth'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

import { FirebaseAuthError } from '@/core/errors/erros/firebase-auth-error'
import type { UseCaseResponse } from '@/core/types/use-case-response'
import { failure, success } from '@/core/types/use-case-response-helpers'
import { auth } from '@/firebase/client'

export async function signUpWithEmailAndPassword(
  email: string,
  password: string
): Promise<UseCaseResponse<User>> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return success(userCredential.user)
  } catch (error) {
    const firebaseError = error as FirebaseError
    return failure(new FirebaseAuthError(firebaseError), {
      status: 400,
      statusText: 'Erro ao registrar com e-mail',
    })
  }
}

export async function signUpWithGoogle(): Promise<UseCaseResponse<User>> {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    return success(result.user)
  } catch (error) {
    const firebaseError = error as FirebaseError
    return failure(new FirebaseAuthError(firebaseError), {
      status: 400,
      statusText: 'Erro ao registrar com Google',
    })
  }
}
