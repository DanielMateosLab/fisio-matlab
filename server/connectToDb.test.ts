import { MongoClient } from "mongodb"
import { MissingEnvVarError } from "../appShared/errors"
import connectToDb, { resetConn } from "./connectToDb"
require("dotenv").config()

jest.mock("mongodb", () => ({
  MongoClient: {
    connect: jest.fn(async () => true),
  },
}))

describe("connectToDb", () => {
  beforeEach(() => {
    resetConn()
  })
  it("should return the conn", async () => {
    const conn = await connectToDb()

    // true is the return value of the mocked connect()
    expect(conn).toEqual(true)
  })
  it("should call MongoClient.connect only in the first call", async () => {
    await connectToDb()
    await connectToDb()

    expect(MongoClient.connect).toHaveBeenCalledTimes(1)
  })
  it("should throw if process.env.DB_URI is not set", async () => {
    expect.hasAssertions()
    process.env.DB_URI = ""

    try {
      await connectToDb()
    } catch (e) {
      expect(e).toBeInstanceOf(MissingEnvVarError)
    }
  })
})
