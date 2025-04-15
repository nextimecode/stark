import type { UseCaseError } from "@/core/errors/use-case-error";

import type {
  UseCaseResponseBase,
  UseCaseResponseFailure,
  UseCaseResponseSuccess,
} from "./use-case-response";

export const success = <T>(
  data: T,
  base: Pick<UseCaseResponseBase, "status" | "statusText"> = {
    status: 200,
    statusText: "OK",
  },
): UseCaseResponseSuccess<T> => ({
  ...base,
  data,
  error: null,
});

export const failure = (
  error: UseCaseError,
  base: Pick<UseCaseResponseBase, "status" | "statusText"> = {
    status: 400,
    statusText: "Bad Request",
  },
): UseCaseResponseFailure => ({
  ...base,
  data: null,
  error,
});
