export class FieldValidationError<T> {
  status = 400
  name = "FieldValidationError"
  message = "One of the fields has an invalid format"
  payload: Partial<T>

  constructor(payload: Partial<T>) {
    this.payload = payload

    const field = !!Object.keys(payload).length && Object.keys(payload)[0]
    if (field) {
      // @ts-ignore
      this.message = payload[field]
    }
  }
}

export class UserNotFoundError {
  status = 404
  name = "UserNotFoundError"
  message = "User not found"
}

export class MissingEnvVarError {
  status = 500
  name = "MissingEnvVarError"
  message: string

  constructor(envVar: string) {
    this.message = `Missing ${envVar} environment variable.`
  }
}
