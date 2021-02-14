import { logIn } from "server/auth"
import bcrypt from "bcryptjs"
import {
  InvalidCredentialsError,
  MethodNotAllowedError,
} from "appShared/errors"
import { loginValidationSchema } from "appShared/Validation"
import catchErrors from "server/middleware/catchErrors"
import database from "server/middleware/database"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import users from "server/middleware/users"
import { ExtendedApiHandler, User } from "server/types"
import UsersDAO from "server/usersDAO"
import { LoginResponse } from "appShared/types"

export const loginHandler: ExtendedApiHandler<LoginResponse> = async (
  req,
  res
) => {
  if (req.method !== "POST") throw new MethodNotAllowedError()

  await loginValidationSchema.validate(req.body)

  const { email, password } = req.body as User
  await runMiddlewares(req, res, session, database, users)

  const user = await UsersDAO.getUserByEmail(email)
  if (!user) throw new InvalidCredentialsError()

  const isValidPwd = await bcrypt.compare(password, user.password)
  if (!isValidPwd) throw new InvalidCredentialsError()

  logIn(req, email)

  return res.status(201).json({ status: "success" })
}

export default catchErrors(loginHandler)
