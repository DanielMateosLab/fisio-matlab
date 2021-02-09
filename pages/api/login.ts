import { NextApiResponse } from "next"
import catchErrors from "server/middleware/catchErrors"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import { ExtendedApiHandler, ExtendedRequest } from "server/types"

export const loginHandler: ExtendedApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Invalid method" })
  }
  await runMiddlewares(req, res, session)
}

export default catchErrors(loginHandler)
