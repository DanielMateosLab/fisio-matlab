import bcrypt from "bcryptjs"
import {
  MethodNotAllowedError,
  InvalidCredentialsError,
} from "appShared/errors"
import { LoginData } from "appShared/types"
import { loginValidationSchema } from "appShared/Validation"
import {
  createMocks,
  createRequest,
  createResponse,
  RequestOptions,
} from "node-mocks-http"
import { loginHandler } from "pages/api/login"
import UsersDAO from "server/usersDAO"

describe("/api/login", () => {
  let req: any, res: any

  const getUserByEmailSpy = jest
    .spyOn(UsersDAO, "getUserByEmail")
    .mockImplementation(async () => ({ email, password }))

  const user: LoginData = {
    email: "aaaa@aaa.aa",
    password: "bbbbbb",
  }

  const { email, password } = user

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
  it("should run session, database and users middlewares", async () => {
    const sessionSpy = jest.spyOn(
      require("server/middleware/session"),
      "default"
    )
    const databaseSpy = jest.spyOn(
      require("server/middleware/database"),
      "default"
    )
    const usersSpy = jest.spyOn(require("server/middleware/users"), "default")

    await loginHandler(req, res)

    expect(sessionSpy).toHaveBeenCalled()
    expect(databaseSpy).toHaveBeenCalled()
    expect(usersSpy).toHaveBeenCalled()
  })
  it("should try to find the user in the db", async () => {
    await loginHandler(req, res)

    expect(getUserByEmailSpy).toHaveBeenCalledWith(email)
  })
  it("should throw an InvalidCredentialsError if the user does not exist", async () => {
    expect.hasAssertions()
    try {
      jest
        .spyOn(UsersDAO, "getUserByEmail")
        .mockImplementationOnce(async () => null)

      await loginHandler(req, res)
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidCredentialsError)
    }
  })
  it("should check if the password is true", async () => {
    const bcryptSpy = jest.spyOn(bcrypt, "compare")

    await loginHandler(req, res)

    expect(bcryptSpy).toHaveBeenCalled()
  })
  it.todo("should throw an InvalidCredentialsError the password is wrong")
  it.todo("should call req.logIn if the password is valid")
  it.todo(
    "should return a res with 201 status and { success: true } as response body"
  )
})
