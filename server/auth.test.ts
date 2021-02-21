import { pendingLogoutCookieName } from "appShared/appData"
import Cookies from "js-cookie"
import { logIn, logout } from "./auth"

jest.mock("js-cookie")

describe("auth", () => {
  describe("logIn", () => {
    it("should add the given email to the req.session object", () => {
      const req = {
        session: {
          email: "",
        },
      }
      const email = "mockEmail@mock.com"

      logIn(req as any, email)

      expect(req.session.email).toEqual(email)
    })
  })
  describe("logout", () => {
    const destroy = jest.fn((fn: Function) => {
      fn()
    })
    const req = {
      session: { destroy },
      cookies: {
        [pendingLogoutCookieName]: "1",
      },
    }
    it("should call req.session.destroy()", () => {
      logout(req as any)

      expect(destroy).toHaveBeenCalled()
    })
    it("should remove pendingLogoutCookie if it exists and session is successfully removed", () => {
      logout(req as any)

      expect(Cookies.remove).toHaveBeenCalledWith(pendingLogoutCookieName)
    })
  })
})
