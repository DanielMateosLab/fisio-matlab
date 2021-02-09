import { MethodNotAllowedError } from "appShared/errors"
import { NextApiResponse } from "next"
import catchErrors from "server/middleware/catchErrors"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import { ExtendedApiHandler } from "server/types"

export const loginHandler: ExtendedApiHandler = async (req, res) => {
  if (req.method !== "POST") throw new MethodNotAllowedError()

  await runMiddlewares(req, res, session)
}

export default catchErrors(loginHandler)
