import type { UseCaseError } from '@/core/errors/use-case-error'
import type {
  UseCaseResponseBase,
  UseCaseResponseFailure,
  UseCaseResponseSuccess
} from './use-case-response'

const DEFAULT_SUCCESS_BASE: Pick<UseCaseResponseBase, 'status' | 'statusText'> =
  {
    status: 200,
    statusText: 'OK'
  }

const DEFAULT_FAILURE_BASE: Pick<UseCaseResponseBase, 'status' | 'statusText'> =
  {
    status: 400,
    statusText: 'Bad Request'
  }

export const success = <T>(
  data: T,
  base: Pick<
    UseCaseResponseBase,
    'status' | 'statusText'
  > = DEFAULT_SUCCESS_BASE
): UseCaseResponseSuccess<T> => ({
  ...base,
  data,
  error: null
})

export const failure = (
  error: UseCaseError,
  base: Pick<
    UseCaseResponseBase,
    'status' | 'statusText'
  > = DEFAULT_FAILURE_BASE
): UseCaseResponseFailure => ({
  ...base,
  data: null,
  error
})
