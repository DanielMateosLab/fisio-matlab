import { emailErrorText, signupValidationSchema } from "appShared/Validation"
import { logIn } from "server/auth"
import database from "server/middleware/database"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import { ExtendedApiHandler, ExtendedRequest } from "server/types"
import UsersDAO from "server/usersDAO"
import { ValidationError } from "yup"
import { UsersPostResponse } from "appShared/types"
import users from "server/middleware/users"
import catchErrors from "server/middleware/catchErrors"
import { MethodNotAllowedError } from "appShared/errors"

export const usersHandler: ExtendedApiHandler<UsersPostResponse> = async (
  req,
  res
) => {
  if (req.method !== "POST") throw new MethodNotAllowedError()

  // Throws if validation fails
  await signupValidationSchema.validate(req.body, { abortEarly: false })

  await runMiddlewares(req, res, session, database, users)

  const { email, password } = req.body

  const alreadyExists = await UsersDAO.getUserByEmail(email)
  if (alreadyExists) throw new ValidationError(emailErrorText, email, "email")

  await UsersDAO.addUser({ email, password })
  logIn(req, email)

  return res.status(201).json({ status: "success" })
}

export default catchErrors(usersHandler)
