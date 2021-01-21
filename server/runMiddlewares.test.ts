import { createRequest, createResponse } from "node-mocks-http"
import runMiddlewares from "./runMiddlewares"

describe("runMiddlewares", () => {
  let req: any, res: any
  beforeEach(() => {
    req = createRequest()
    res = createResponse()
  })
  it("should throw the mock exception", async () => {
    const exception = "mock exception"
    expect.hasAssertions()
    try {
      const mockMiddleware = async () => {
        throw exception
      }
      await runMiddlewares(req, res, mockMiddleware)
    } catch (e) {
      expect(e).toEqual(exception)
    }
  })
})
