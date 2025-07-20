// firebase/auth/register.ts

'use client'

import {
  auth,
  createUserWithEmailAndPassword as firebaseClientCreateUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  type User
} from '@/firebase/client'
import type { FirebaseError } from 'firebase/app'
import { FirebaseAuthError } from '@/core/errors/erros/firebase-auth-error'
import type { UseCaseResponse } from '@/core/types/use-case-response'
import { failure, success } from '@/core/types/use-case-response-helpers'

export async function signUpWithEmailAndPassword(
  email: string,
  password: string
): Promise<UseCaseResponse<User>> {
  try {
    const { user } = await firebaseClientCreateUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return success(user)
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError
    return failure(new FirebaseAuthError(firebaseError), {
      status: 400,
      statusText: 'Erro ao registrar com e-mail'
    })
  }
}

export async function signUpWithGoogle(): Promise<UseCaseResponse<User>> {
  const provider = new GoogleAuthProvider()

  try {
    const { user } = await signInWithPopup(auth, provider)
    return success(user)
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError
    return failure(new FirebaseAuthError(firebaseError), {
      status: 400,
      statusText: 'Erro ao registrar com Google'
    })
  }
}
