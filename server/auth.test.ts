import { logIn } from "./auth"

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
})
