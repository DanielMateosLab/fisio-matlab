import {
  InvalidCredentialsError,
  MethodNotAllowedError,
} from "appShared/errors"
import { loginValidationSchema } from "appShared/Validation"
import { NextApiResponse } from "next"
import catchErrors from "server/middleware/catchErrors"
import database from "server/middleware/database"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import users from "server/middleware/users"
import { ExtendedApiHandler, User } from "server/types"
import UsersDAO from "server/usersDAO"

export const loginHandler: ExtendedApiHandler = async (req, res) => {
  if (req.method !== "POST") throw new MethodNotAllowedError()

  await loginValidationSchema.validate(req.body)

  const { email, password } = req.body as User
  await runMiddlewares(req, res, session, database, users)

  const user = await UsersDAO.getUserByEmail(email)
  if (!user) throw new InvalidCredentialsError()
}

export default catchErrors(loginHandler)
