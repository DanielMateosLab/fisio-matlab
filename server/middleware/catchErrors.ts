import { yupToFormErrors } from "formik"
import { NextApiResponse } from "next"
import { ExtendedApiHandler, ExtendedRequest } from "server/types"
import { ValidationError } from "yup"

const catchErrors = (handler: ExtendedApiHandler) => async (
  req: ExtendedRequest,
  res: NextApiResponse
) => {
  try {
    await handler(req, res)
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400).json({
        name: e.name,
        message: "Validation Error",
        payload: yupToFormErrors(e),
      })
    }

    res.status(e.status || 500).json({
      name: e.name || "InternalServerError",
      message: e.message || "Internal Server Error",
    })
  }
}

export default catchErrors
