export class FieldValidationError<T> {
  name = "FieldValidationError"
  message = "Alguno de los campos tiene un formato incorrecto"
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
  name = "UserNotFoundError"
  message = "No se ha podido encontrar el usuario"
}
