import { waitFor } from "@testing-library/react"
import { createRequest, createResponse } from "node-mocks-http"
import { meHandler } from "pages/api/users/me"
import * as auth from "server/auth"

describe("GET /api/users/me", () => {
  let req: any, res: any
  const email = "aaaa@aaa.aa"

  beforeEach(() => {
    req = { ...createRequest({ method: "GET" }), session: { email } }
    res = createResponse()
  })
  it("should use session middleware", () => {
    const sessionSpy = jest.spyOn(
      require("server/middleware/session"),
      "default"
    )

    meHandler(req, res)

    expect(sessionSpy).toHaveBeenCalled()
  })
  describe("if there is no session", () => {
    beforeEach(() => {
      delete req.session
    })
    it("should call logout", async () => {
      const logoutSpy = jest.spyOn(auth, "logout")
      meHandler(req, res)

      await waitFor(() => {
        expect(logoutSpy).toHaveBeenCalled()
      })
    })
  })
  it.todo("should try to get the user if there is a session")
})
