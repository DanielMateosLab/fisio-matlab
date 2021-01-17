import { Session } from "express-session"
import { NextApiRequest } from "next"

export interface User {
  email: string
  password: string
}

export interface DAOResponse {
  success: true
}

export type ExtendedRequest = NextApiRequest & {
  session: Session
}
