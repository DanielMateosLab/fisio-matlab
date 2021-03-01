import { UsersGetResponse } from "appShared/types"
import { logout } from "server/auth"
import catchErrors from "server/middleware/catchErrors"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import { ExtendedApiHandler } from "server/types"

export const meHandler: ExtendedApiHandler<UsersGetResponse> = async (
  req,
  res
) => {
  runMiddlewares(req, res, session)

  const email = req.session?.email

  if (!email) {
    logout(req)
  }
}

export default catchErrors(meHandler)
