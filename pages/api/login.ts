import { NextApiResponse } from "next"
import runMiddleware from "../../server/runMiddleware"
import session from "../../server/session"
import { ExtendedRequest } from "../../server/types"

export default async (req: ExtendedRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.statusCode = 400
    res.send("Invalid method")
  }
  await runMiddleware(req, res, session)
  res.statusCode = 200
  res.json({ name: "John Doe" })
}
