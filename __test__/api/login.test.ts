import { MethodNotAllowedError } from "appShared/errors"
import { LoginData } from "appShared/types"
import { loginValidationSchema } from "appShared/Validation"
import {
  createMocks,
  createRequest,
  createResponse,
  RequestOptions,
} from "node-mocks-http"
import { loginHandler } from "pages/api/login"

describe("/api/login", () => {
  let req: any, res: any

  const user: LoginData = {
    email: "aaaa@aaa.aa",
    password: "bbbbbb",
  }

  beforeEach(() => {
    req = createRequest({
      method: "POST",
      body: user,
    })
    res = createResponse()
  })

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
  it("should validate the request body", async () => {
    const spy = jest
      .spyOn(loginValidationSchema, "validate")
      .mockImplementationOnce(async (values) => values)

    await loginHandler(req, res)

    expect(spy).toHaveBeenCalledWith(user)
  })
  it.todo("should check if the password is true")
  it.todo("should throw if the password is wrong")
  it.todo("should call req.logIn if the password is valid")
  it.todo(
    "should return a res with 201 status and { success: true } as response body"
  )
})
