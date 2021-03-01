import { UsersGetResponse } from "appShared/types"
import catchErrors from "server/middleware/catchErrors"
import { ExtendedApiHandler } from "server/types"

export const meHandler: ExtendedApiHandler<UsersGetResponse> = async (
  req,
  res
) => {}

export default catchErrors(meHandler)
