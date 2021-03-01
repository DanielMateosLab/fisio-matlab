import catchErrors from "server/middleware/catchErrors"
import { ExtendedApiHandler } from "server/types"

export const meHandler: ExtendedApiHandler<UsersPostResponse> = async (
  req,
  res
) => {}

export default catchErrors(meHandler)
