import { UserNotFoundError } from "appShared/errors"
import { NextApiResponse } from "next"
import { createRequest, createResponse } from "node-mocks-http"
import { ExtendedRequest } from "server/types"
import { ValidationError } from "yup"
import catchErrors from "./catchErrors"

const mockHanlder = (error: any) => async (
  req: ExtendedRequest,
  res: NextApiResponse
) => {
  throw error
}

describe("catchErrors", () => {
  let req: any, res: any
  let jsonSpy: jest.SpyInstance
  let statusSpy: jest.SpyInstance

  const message = "mockError"

  beforeEach(() => {
    req = createRequest()
    res = createResponse()
    jsonSpy = jest.spyOn(res, "json")
    statusSpy = jest.spyOn(res, "status")
  })

  it("should parse validation errors", async () => {
    expect.hasAssertions()
    const field = "mockField"

    await catchErrors(mockHanlder(new ValidationError(message, "", field)))(
      req,
      res
    )

    expect(jsonSpy).toHaveBeenCalledWith({
      status: "error",
      name: "ValidationError",
      message: "Validation Error",
      payload: {
        [field]: message,
      },
    })
    expect(statusSpy).toHaveBeenCalledWith(400)
  })
  it("should parse exceptions with no name or message", async () => {
    expect.hasAssertions()
    const exception = "mockException"

    await catchErrors(mockHanlder(exception))(req, res)

    expect(jsonSpy).toHaveBeenCalledWith({
      status: "error",
      name: "InternalServerError",
      message: "Internal Server Error",
    })
    expect(statusSpy).toHaveBeenCalledWith(500)
  })
  it("should parse a UserNotFoundError", async () => {
    expect.hasAssertions()
    const error = new UserNotFoundError()

    await catchErrors(mockHanlder(error))(req, res)

    expect(jsonSpy).toHaveBeenCalledWith({
      status: "error",
      name: error.name,
      message: error.message,
    })
    expect(statusSpy).toHaveBeenCalledWith(error.statusCode)
  })
})
