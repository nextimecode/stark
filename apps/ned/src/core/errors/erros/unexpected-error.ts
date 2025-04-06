import { UseCaseError } from '../use-case-error'

export class UnexpectedError extends Error implements UseCaseError {
  details: string
  hint: string
  code: string

  constructor(message = 'Unexpected error occurred') {
    super(message)
    this.name = 'UnexpectedError'

    this.details = 'Ocorreu um erro inesperado que não pôde ser tratado.'
    this.hint = 'Verifique os logs da aplicação para mais detalhes.'
    this.code = 'UNEXPECTED_ERROR'
  }
}
