import { UseCaseError } from '../use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  code: string
  details: string
  hint: string

  constructor() {
    super('Resource not found')
    this.name = 'ResourceNotFoundError'
    this.details = 'O recurso solicitado não existe ou foi removido.'
    this.hint = 'Verifique o ID ou parâmetro fornecido.'
    this.code = 'RESOURCE_NOT_FOUND'
  }
}
