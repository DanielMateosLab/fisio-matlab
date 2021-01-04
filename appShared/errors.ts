export class FieldValidationError<T> {
  name = "FieldValidationError"
  message = "Validation failed for one of the fields"
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
