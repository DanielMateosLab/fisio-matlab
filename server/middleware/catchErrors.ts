import { ErrorResponse } from "appShared/types"
import { yupToFormErrors } from "formik"
import { ExtendedApiHandler } from "server/types"
import { ValidationError } from "yup"

const catchErrors = (handler: ExtendedApiHandler<ErrorResponse<{}>>) =>
  (async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          status: "error",
          name: e.name,
          message: "Validation Error",
          payload: yupToFormErrors(e),
        })
      }

      return res.status(e.statusCode || 500).json({
        status: "error",
        name: e.name || "InternalServerError",
        message: e.message || "Internal Server Error",
      })
    }
  }) as ExtendedApiHandler<ErrorResponse<{}>>

export default catchErrors
