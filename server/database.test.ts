import { MongoClient } from "mongodb"
import httpRequest from "node-mocks-http"
import { MissingEnvVarError } from "../appShared/errors"
import database, { resetConn } from "./database"
require("dotenv").config()

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

    // true is the return value of the mocked connect()
    expect(req.conn).toEqual(true)
  })
  it("should call MongoClient.connect only in the first call", async () => {
    await database(req, res)
    await database(req, res)

    expect(MongoClient.connect).toHaveBeenCalledTimes(1)
  })
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
