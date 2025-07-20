import { FirebaseError } from 'firebase/app'
import { UseCaseError } from '../use-case-error'

export class FirebaseAuthError extends Error implements UseCaseError {
  code: string
  details: string
  hint: string

  constructor(firebaseError: FirebaseError) {
    super(firebaseError.message)
    this.name = 'FirebaseAuthError'

    this.details = firebaseError.message
    this.hint = 'Erro retornado diretamente pela autenticação do Firebase.'
    this.code = firebaseError.code
  }
}
