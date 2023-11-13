// Description
//   - Make sure Errors are Errors
//   - Don’t lose stack trace
//   - Use constant error messages
//   - Provide the right amount of context
//   - Don’t throw errors for problems that are expected to happen
// -----------------------------------------------------------------------------
import { ZodError } from 'zod'

type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable }

export class BaseError extends Error {
  public readonly context?: Jsonable

  constructor(
    message: string,
    options: { cause?: Error; context?: Jsonable } = {},
  ) {
    const { cause, context } = options

    super(message, { cause })
    this.name = this.constructor.name
    this.context = context
  }
}

export function ensureError(value: unknown): BaseError {
  if (value instanceof ZodError) return ZodErrorHandling(value)
  if (value instanceof BaseError) return BaseErrorHandling(value)
  if (value instanceof Error) return DefaultErrorHandling(value)

  return unknownErrorHandling(value)
}

function ZodErrorHandling(value: ZodError): BaseError {
  return new BaseError(value.issues[0].message, { cause: value })
}

function BaseErrorHandling(value: BaseError): BaseError {
  return value
}

function DefaultErrorHandling(value: Error): BaseError {
  return value
}

function unknownErrorHandling(value: unknown): BaseError {
  let stringifiedValue = '[Unable to stringify the thrown value]'

  try {
    stringifiedValue = JSON.stringify(value)
  } catch {}

  return new BaseError(`Unknown error: ${stringifiedValue}`)
}
