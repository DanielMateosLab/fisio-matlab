import { SerializedError } from "@reduxjs/toolkit"

export interface AsyncThunkAction {
  type: string
  payload?: {
    [key: string]: string
  }
  error: SerializedError & { message: string }
  meta: {}
}
