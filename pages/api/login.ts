import { NextApiResponse } from "next"
import runMiddlewares from "server/middleware/runMiddlewares"
import session from "server/middleware/session"
import { ExtendedRequest } from "server/types"

export default async (req: ExtendedRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Invalid method" })
  }
  await runMiddlewares(req, res, session)
}
