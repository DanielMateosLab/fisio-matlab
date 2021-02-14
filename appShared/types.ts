export interface APIErrorResponse<PayloadType> {
  name?: string
  message: string
  payload?: PayloadType
}

export type UsersPostResponse = Partial<
  { email: string } & APIErrorResponse<Partial<SignupData>>
>

export type ResponseBody<SuccessBody, PayloadType = {}> = Partial<
  SuccessBody & APIErrorResponse<PayloadType>
>

export interface SignupData {
  email: string
  password: string
  repeatPassword: string
}

export interface LoginData {
  email: string
  password: string
}

export type LoginResponse = ErrorResponse<LoginData> | SuccessResponse

type SuccessResponse<Payload = {}> = {
  status: "success"
} & Payload

type ErrorResponse<Payload> = {
  status: "error"
  name: string
  message: string
  /** Used in field validation */
  payload?: Payload
}
