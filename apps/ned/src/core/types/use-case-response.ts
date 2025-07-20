import type { UseCaseError } from '@/core/errors/use-case-error'

export type UseCaseResponse<T> =
  | UseCaseResponseFailure
  | UseCaseResponseSuccess<T>

export interface UseCaseResponseBase {
  status: number
  statusText: string
}

export interface UseCaseResponseFailure extends UseCaseResponseBase {
  data: null
  error: UseCaseError
}

export interface UseCaseResponseSuccess<T> extends UseCaseResponseBase {
  data: T
  error: null
}
