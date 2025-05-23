import type { UseCaseError } from '@/core/errors/use-case-error'

export interface UseCaseResponseBase {
  status: number
  statusText: string
}

export interface UseCaseResponseSuccess<T> extends UseCaseResponseBase {
  error: null
  data: T
}

export interface UseCaseResponseFailure extends UseCaseResponseBase {
  error: UseCaseError
  data: null
}

export type UseCaseResponse<T> =
  | UseCaseResponseSuccess<T>
  | UseCaseResponseFailure
