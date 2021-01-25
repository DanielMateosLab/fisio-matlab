import { InternalServerError } from "appShared/errors"
import { createMocks } from "node-mocks-http"
import users from "server/middleware/users"
import UsersDAO from "server/usersDAO"

describe("users middleware", () => {
  let req: any, res: any
  const next = () => {}

  beforeEach(() => {
    const mocks = createMocks<any, any>()
    req = mocks.req
    res = mocks.res
  })

  it("should throw if there is no database connection in the req", () => {
    expect.hasAssertions()

    try {
      users(req, res, next)
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerError)
    }
  })
  it("should call UsersDao.injectDb in there is a connection", () => {
    const spy = jest.spyOn(UsersDAO, "injectDb").mockImplementation(() => {})
    const conn = "mock"
    req.conn = conn

    users(req, res, next)

    expect(spy).toHaveBeenCalledWith(conn)
  })
})
