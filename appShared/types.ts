// TODO: check if the failed requests are logged in console with the res body
export interface APIErrorResponse {
  name?: string
  message: string
  payload?: {}
}

export interface SignupData {
  email: string
  password: string
  repeatPassword: string
}

export interface LoginData {
  email: string
  password: string
}

export interface UsersPostResponse {
  email: string
}
