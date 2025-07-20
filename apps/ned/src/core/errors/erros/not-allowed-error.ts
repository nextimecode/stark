import { UseCaseError } from '../use-case-error'

export class NotAllowedError extends Error implements UseCaseError {
  code: string
  details: string
  hint: string

  constructor() {
    super('Not allowed')
    this.name = 'NotAllowedError'
    this.details = 'Você não tem permissão para executar esta ação.'
    this.hint = 'Verifique suas credenciais ou permissões.'
    this.code = 'NOT_ALLOWED'
  }
}
