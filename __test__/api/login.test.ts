import { MethodNotAllowedError } from "appShared/errors"
import { createMocks, RequestOptions } from "node-mocks-http"
import { loginHandler } from "pages/api/login"

describe("/api/login", () => {
  it("should throw a MethodNotAllowedError with get, put, patch or del", async () => {
    const notAllowedMethods: RequestOptions["method"][] = [
      "GET",
      "PUT",
      "PATCH",
      "DELETE",
    ]

    expect.assertions(notAllowedMethods.length)

    for (let method in notAllowedMethods) {
      const { req, res } = createMocks({
        method: method as RequestOptions["method"],
      })

      try {
        await loginHandler(req as any, res as any)
      } catch (e) {
        expect(e).toBeInstanceOf(MethodNotAllowedError)
      }
    }
  })
})
