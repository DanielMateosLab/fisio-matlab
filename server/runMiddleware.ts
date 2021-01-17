import { NextApiResponse } from "next"
import { ExtendedRequest } from "./types"

const runMiddleware = async (
  req: ExtendedRequest,
  res: NextApiResponse,
  fn: Function
) => fn(req, res, (result: any) => result)

export default runMiddleware
