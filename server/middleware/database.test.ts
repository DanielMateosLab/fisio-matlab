import { MongoClient } from "mongodb"
import httpRequest from "node-mocks-http"
import { MissingEnvVarError } from "../../appShared/errors"
import database, { onClose, resetConn } from "./database"

jest.mock("mongodb", () => ({
  MongoClient: {
    connect: jest.fn(async () => true),
  },
}))

describe("database", () => {
  let req: any, res: any
  beforeEach(() => {
    resetConn()
    req = httpRequest.createRequest()
    res = httpRequest.createResponse()
  })
  it("should add the conn to the req object", async () => {
    await database(req, res)

    expect(req.conn).toBeDefined()
  })
  it("should call MongoClient.connect only in the first call", async () => {
    await database(req, res)
    await database(req, res)

    expect(MongoClient.connect).toHaveBeenCalledTimes(1)
  })
  describe("should close the db conn when the response ends", () => {
    test("the event handler should close the connection if the client is connected", () => {
      const conn = {
        isConnected: true,
        close: jest.fn(async () => {}),
      }

      onClose(conn as any)()
      expect(conn.close).toHaveBeenCalled()

      conn.close.mockClear()
      conn.isConnected = false
      onClose(conn as any)()
      expect(conn.close).not.toHaveBeenCalled()
    })
    it("should set up the onClose event handler", async () => {
      const spy = jest.spyOn(res, "addListener")
      await database(req, res)

      expect(spy).toHaveBeenCalled()
      expect(spy.mock.calls[0]).toContain("close")
    })
  })
  // Has to be the last test to avoid a MissingEnvVarError
  it("should throw if process.env.DB_URI is not set", async () => {
    expect.hasAssertions()
    process.env.DB_URI = ""

    try {
      await database(req, res)
    } catch (e) {
      expect(e).toBeInstanceOf(MissingEnvVarError)
    }
  })
})
