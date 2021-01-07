import { Collection, MongoClient } from "mongodb"
import { appName } from "../appShared/appData"
import { FieldValidationError } from "../appShared/errors"
import UsersDAO from "./usersDAO"

require("dotenv").config()

const mockUser = {
  email: "aaaa@aaa.aa",
  password: "aaaaaa",
}

const DB_URI = process.env.TEST_DB_URI
if (!DB_URI)
  throw "Lacking db uri. Set it in the TEST_DB_URI environment variable"

describe("usersDAO", () => {
  let client: MongoClient
  let users: Collection
  beforeAll(async () => {
    client = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    users = client.db(appName).collection("users")
  })
  afterEach(async () => {
    await users.deleteMany({})
  })
  afterAll(async () => {
    await users.deleteMany({})
    await client.close()
  })

  describe("injectDB", () => {
    it("should call client.db only in the first call", () => {
      const spy = jest.spyOn(client, "db")

      UsersDAO.injectDB(client)
      UsersDAO.injectDB(client)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
  describe("addUser", () => {
    it("should add the user", async () => {
      const user = await UsersDAO.addUser(mockUser)

      const insertedUser = await users.findOne({})

      expect(user).toEqual(insertedUser)
    })
    it("should throw an exception if the user already exists", async () => {
      try {
        await users.insertOne(mockUser)

        const user = await UsersDAO.addUser(mockUser)
        expect(user).toBeUndefined()
      } catch (e) {
        expect(e).toBeDefined()
        expect(e).toBeInstanceOf(FieldValidationError)
      }
    })
    it("should hash the password", async () => {
      const user = await UsersDAO.addUser(mockUser)

      expect(user.password).not.toEqual(mockUser.password)
    })
  })
  describe("getUserByEmail", () => {
    it("should return the user", async () => {
      await users.insertOne(mockUser)

      const user = await UsersDAO.getUserByEmail(mockUser.email)

      expect(user).toBeDefined()
      expect(user!.email).toEqual(mockUser.email)
    })
    it("should return null if no user is found", async () => {
      const user = await UsersDAO.getUserByEmail(mockUser.email)

      expect(user).toBeNull()
    })
  })
  describe("updateUserPassword", () => {
    it.todo(
      "should return { success: true } if the password has been successfully changed"
    )
    it.todo("should hash the new password")
  })
})
