import * as auth from "server/auth"
import { usersHandler } from "pages/api/users"
import {
  createMocks,
  createRequest,
  createResponse,
  RequestOptions,
} from "node-mocks-http"
import { signupValidationSchema } from "appShared/Validation"
import { SignupData } from "appShared/types"
import { ValidationError } from "yup"
import UsersDAO from "server/usersDAO"

jest.mock("server/usersDAO")

describe("/api/users", () => {
  describe("post", () => {
    let req: any, res: any

    const user: SignupData = {
      email: "aaaa@aaa.aa",
      password: "bbbbbb",
      repeatPassword: "bbbbbb",
    }

    const validationSpy = jest
      .spyOn(signupValidationSchema, "validate")
      .mockImplementation(async (data) => data)
    const getUserSpy = jest
      .spyOn(UsersDAO, "getUserByEmail")
      .mockImplementation(async (email) => null)

    beforeEach(() => {
      req = createRequest({
        method: "POST",
        body: user,
      })
      res = createResponse()
    })
    it("should 405 invalid method with get, put, patch or del", async () => {
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

        await usersHandler(req as any, res as any)

        expect(res.statusCode).toEqual(405)
      }
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

      await usersHandler(req, res)

      expect(sessionSpy).toHaveBeenCalled()
      expect(databaseSpy).toHaveBeenCalled()
      expect(usersSpy).toHaveBeenCalled()
    })
    it("should validate the request body", async () => {
      await usersHandler(req, res)

      expect(validationSpy.mock.calls[0]).toContainEqual(user)
    })
    it("should throw if the user exists", async () => {
      expect.hasAssertions()
      jest
        .spyOn(UsersDAO, "getUserByEmail")
        .mockImplementationOnce(async () => user)

      try {
        await usersHandler(req, res)
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError)
      }
    })
    it("should add the user to the db", async () => {
      const spy = jest.spyOn(UsersDAO, "addUser")

      await usersHandler(req, res)

      expect(spy).toHaveBeenCalledWith({
        email: user.email,
        password: user.password,
      })
    })
    it("should logIn the user", async () => {
      const spy = jest.spyOn(auth, "logIn")

      await usersHandler(req, res)

      expect(spy).toHaveBeenCalledWith(req, user.email)
    })
    it("should send the email as response with a 201 status", async () => {
      const jsonSpy = jest.spyOn(res, "json")

      await usersHandler(req, res)

      expect(res.statusCode).toEqual(201)
      expect(jsonSpy).toHaveBeenCalledWith({ email: user.email })
    })
  })
})
