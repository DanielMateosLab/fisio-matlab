import { Session } from "express-session"
import { MongoClient } from "mongodb"
import { NextApiRequest } from "next"

export interface User {
  email: string
  password: string
}

export interface DAOResponse {
  success: true
}

export type ExtendedRequest = NextApiRequest & {
  session: Session & { email: string | undefined }
  conn: MongoClient | undefined
}
