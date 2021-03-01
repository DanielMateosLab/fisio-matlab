import { User } from "server/types"

type SuccessResponse<Payload = {}> = {
  status: "success"
} & Payload

export type ErrorResponse<Payload = undefined> = {
  status: "error"
  name: string
  message: string
  /** Used in field validation */
  payload?: Payload
}

export interface SignupData {
  email: string
  password: string
  repeatPassword: string
}
export type UsersPostResponse = ErrorResponse<SignupData> | SuccessResponse

export type UserWithoutPassword = Omit<User, "password">

export type UsersGetResponse =
  | ErrorResponse
  | SuccessResponse<{ user: UserWithoutPassword }>

export interface LoginData {
  email: string
  password: string
}
export type LoginResponse = ErrorResponse<LoginData> | SuccessResponse

export type LogoutResponse = ErrorResponse<undefined> | SuccessResponse
