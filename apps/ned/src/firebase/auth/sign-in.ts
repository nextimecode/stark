// firebase/auth/signin.ts
'use client'

import {
  auth,
  signInWithEmailAndPassword as firebaseClientSignInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  type User
} from '@/firebase/client'
import type { FirebaseError } from 'firebase/app'
import { FirebaseAuthError } from '@/core/errors/erros/firebase-auth-error'
import type { UseCaseResponse } from '@/core/types/use-case-response'
import { failure, success } from '@/core/types/use-case-response-helpers'

export async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<UseCaseResponse<User>> {
  try {
    const userCredential = await firebaseClientSignInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return success(userCredential.user)
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError
    return failure(new FirebaseAuthError(firebaseError), {
      status: 401,
      statusText: 'Erro ao autenticar com e-mail'
    })
  }
}

export async function signInWithGoogle(): Promise<UseCaseResponse<User>> {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    return success(result.user)
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError
    return failure(new FirebaseAuthError(firebaseError), {
      status: 401,
      statusText: 'Erro ao autenticar com Google'
    })
  }
}
