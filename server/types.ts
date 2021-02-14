import { Session } from "express-session"
import { MongoClient } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

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

interface NextFunction {
  (result?: any): any
}

export interface Middleware {
  (
    req: ExtendedRequest,
    res: NextApiResponse,
    next: NextFunction
  ): void | Promise<void>
}

export interface ExtendedApiHandler<JSONBodyType> {
  (req: ExtendedRequest, res: NextApiResponse<JSONBodyType>): void | Promise<
    void
  >
}
