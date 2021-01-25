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
