// firebase/auth/signin.ts

'use client'

export const dynamic = 'force-dynamic'

import { FirebaseError } from 'firebase/app'
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
  type User
} from 'firebase/auth'

import { FirebaseAuthError } from '@/core/errors/erros/firebase-auth-error'
import type { UseCaseResponse } from '@/core/types/use-case-response'
import { failure, success } from '@/core/types/use-case-response-helpers'
import { auth } from '@/firebase/client'

export async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<UseCaseResponse<User>> {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return success(userCredential.user)
  } catch (err: any) {
    const firebaseError = err as FirebaseError
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
  } catch (err: any) {
    const firebaseError = err as FirebaseError
    return failure(new FirebaseAuthError(firebaseError), {
      status: 401,
      statusText: 'Erro ao autenticar com Google'
    })
  }
}
