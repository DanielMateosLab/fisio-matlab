abstract class HttpError extends Error {
  abstract status: number
}

export class UserNotFoundError extends HttpError {
  status = 404
  name = "UserNotFoundError"
  message = "User not found"
}

export class MissingEnvVarError extends HttpError {
  status = 500
  name = "MissingEnvVarError"

  constructor(envVar: string) {
    super(`Missing ${envVar} environment variable.`)
  }
}

export class InternalServerError extends HttpError {
  status = 500
  name = "InternalServerError"
  constructor(message: string) {
    super(message)
  }
}

export class MethodNotAllowedError extends HttpError {
  status = 405
  name = "MethodNotAllowedError"
  message = "Method not allowed"
}

export class InvalidCredentialsError extends HttpError {
  status = 400
  name = "InvalidCredentialsError"
  message = "Invalid email or password"
}
