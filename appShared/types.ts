type SuccessResponse<Payload = {}> = {
  status: "success"
} & Payload

export type ErrorResponse<Payload> = {
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

export type UsersGetResponse =
  | ErrorResponse<SignupData>
  | SuccessResponse<{ user: { email: string } }>

export interface LoginData {
  email: string
  password: string
}
export type LoginResponse = ErrorResponse<LoginData> | SuccessResponse

export type LogoutResponse = ErrorResponse<undefined> | SuccessResponse
