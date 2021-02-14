abstract class HttpError extends Error {
  abstract statusCode: number
}

export class UserNotFoundError extends HttpError {
  statusCode = 404
  name = "UserNotFoundError"
  message = "User not found"
}

export class MissingEnvVarError extends HttpError {
  statusCode = 500
  name = "MissingEnvVarError"

  constructor(envVar: string) {
    super(`Missing ${envVar} environment variable.`)
  }
}

export class InternalServerError extends HttpError {
  statusCode = 500
  name = "InternalServerError"
  constructor(message: string) {
    super(message)
  }
}

export class MethodNotAllowedError extends HttpError {
  statusCode = 405
  name = "MethodNotAllowedError"
  message = "Method not allowed"
}

export class InvalidCredentialsError extends HttpError {
  statusCode = 400
  name = "InvalidCredentialsError"
  message = "Invalid email or password"
}
