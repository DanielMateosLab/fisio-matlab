// Set the final user message in the res handler and console.error the error.
export interface APIErrorResponse {
  error: { [key: string]: any }
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
