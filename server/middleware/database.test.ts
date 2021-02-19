import { MongoClient } from "mongodb"
import httpRequest from "node-mocks-http"
import { MissingEnvVarError } from "../../appShared/errors"
import database, { resetConn } from "./database"

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
