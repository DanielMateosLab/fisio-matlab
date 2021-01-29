import { NextApiResponse } from "next"
import { emailErrorText, signupValidationSchema } from "appShared/Validation"
import { logIn } from "server/auth"
import database from "server/middleware/database"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import { ExtendedApiHandler, ExtendedRequest } from "server/types"
import UsersDAO from "server/usersDAO"
import { ValidationError } from "yup"
import { APIErrorResponse, UsersPostResponse } from "appShared/types"
import users from "server/middleware/users"
import catchErrors from "server/middleware/catchErrors"

export const usersHandler: ExtendedApiHandler = async (
  req: ExtendedRequest,
  res: NextApiResponse<UsersPostResponse | APIErrorResponse>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  await runMiddlewares(req, res, session, database, users)

  await signupValidationSchema.validate(req.body, { abortEarly: false }) // Throws if validation fails

  const { email, password } = req.body

  const alreadyExists = await UsersDAO.getUserByEmail(email)
  if (alreadyExists) throw new ValidationError(emailErrorText, email, "email")

  await UsersDAO.addUser({ email, password })
  logIn(req, email)

  return res.status(201).end()
}

export default catchErrors(usersHandler)
