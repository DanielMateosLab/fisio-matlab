import {
  InvalidCredentialsError,
  MethodNotAllowedError,
} from "appShared/errors"
import { LoginResponse } from "appShared/types"
import { loginValidationSchema } from "appShared/Validation"
import bcrypt from "bcryptjs"
import { logIn, logout } from "server/auth"
import catchErrors from "server/middleware/catchErrors"
import database from "server/middleware/database"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import users from "server/middleware/users"
import { ExtendedApiHandler, User } from "server/types"
import UsersDAO from "server/usersDAO"

export const loginHandler: ExtendedApiHandler<LoginResponse> = async (
  req,
  res
) => {
  await runMiddlewares(req, res, session, database, users)

  if (req.method == "POST") {
    await loginValidationSchema.validate(req.body)

    const { email, password } = req.body as User

    const user = await UsersDAO.getUserByEmail(email)
    if (!user) throw new InvalidCredentialsError()

    const isValidPwd = await bcrypt.compare(password, user.password)
    if (!isValidPwd) throw new InvalidCredentialsError()

    logIn(req, email)

    return res.status(201).json({ status: "success" })
  } else if (req.method == "DELETE") {
    logout(req)
    return res.status(200).json({ status: "success" })
  } else {
    throw new MethodNotAllowedError()
  }
}

export default catchErrors(loginHandler)
