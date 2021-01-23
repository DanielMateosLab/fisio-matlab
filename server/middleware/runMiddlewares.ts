import { NextApiResponse } from "next"
import { ExtendedRequest } from "../types"

const runMiddlewares = async (
  req: ExtendedRequest,
  res: NextApiResponse,
  ...middlewares: Function[]
) => {
  for (let middleware of middlewares) {
    await middleware(req, res, (result: any) => result)
  }
}

export default runMiddlewares
