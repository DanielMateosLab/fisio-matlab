import { yupToFormErrors } from "formik"
import { Collection, MongoClient } from "mongodb"
import { ValidationError } from "yup"
import { appName } from "../appShared/appData"
import { UserNotFoundError } from "../appShared/errors"
import UsersDAO from "./usersDAO"

// Mock bcrypt to cut tests' execution time
jest.mock("bcryptjs", () => ({
  hash: async () => "mockedHash",
}))

const mockUser = {
  email: "aaaa@aaa.aa",
  password: "aaaaaa",
}

const DB_URI = process.env.DB_URI
if (!DB_URI) throw "Lacking db uri. Set it in the DB_URI environment variable"

const DB_NAME = appName
if (!DB_NAME) throw "Lacking DB_NAME environment variable"

describe("usersDAO", () => {
  let conn: MongoClient
  let users: Collection
  beforeAll(async () => {
    conn = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    users = conn.db(DB_NAME).collection("users")
  })
  beforeEach(() => {
    UsersDAO.setUsersCollection(users)
  })
  afterEach(async () => {
    await users.deleteMany({})
  })
  afterAll(async () => {
    await users.deleteMany({})
    await conn.close()
  })

  describe("injectDB", () => {
    it("should call client.db only in the first call", () => {
      UsersDAO.setUsersCollection(undefined)
      const spy = jest.spyOn(conn, "db")

      UsersDAO.injectDb(conn)
      UsersDAO.injectDb(conn)

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
        expect(e).toBeInstanceOf(ValidationError)
      }
    })
    it("should hash the password", async () => {
      const user = await UsersDAO.addUser(mockUser)

      expect(user.password).not.toEqual(mockUser.password)
    })
  })
  describe("getUserByEmail", () => {
    it("should return the user", async () => {
      try {
        await users.insertOne(mockUser)

        const user = await UsersDAO.getUserByEmail(mockUser.email)

        expect(user).toBeDefined()
        expect(user!.email).toEqual(mockUser.email)
      } catch (e) {
        expect(e).toBeUndefined()
      }
    })
    it("should return null if no user is found", async () => {
      try {
        const user = await UsersDAO.getUserByEmail(mockUser.email)

        expect(user).toBeNull()
      } catch (e) {
        expect(e).toBeUndefined()
      }
    })
  })
  describe("updateUserPassword", () => {
    it("should return { success: true } if the password has been successfully changed", async () => {
      try {
        await users.insertOne(mockUser)

        const newPassword = "bbbbbb"
        const result = await UsersDAO.updateUserPassword(
          mockUser.email,
          newPassword
        )
        const user = await users.findOne({ email: mockUser.email })

        expect(result).toEqual({ success: true })
        // Check that the pwd has been changed
        expect(user.password).not.toEqual(mockUser.password)
      } catch (e) {
        expect(e).toBeUndefined()
      }
    })
    it("should throw an exception if no user is found", async () => {
      try {
        const newPassword = "bbbbbb"
        await UsersDAO.updateUserPassword(mockUser.email, newPassword)
      } catch (e) {
        expect(e).toBeInstanceOf(UserNotFoundError)
      }
    })
    it("should hash the new password", async () => {
      try {
        await users.insertOne(mockUser)

        const newPassword = "bbbbbb"
        const result = await UsersDAO.updateUserPassword(
          mockUser.email,
          newPassword
        )
        const user = await users.findOne({ email: mockUser.email })

        expect(result).toEqual({ success: true })
        // Check that the pwd is different than the one set, so it is hashed
        expect(user.password).not.toEqual(newPassword)
      } catch (e) {
        expect(e).toBeUndefined()
      }
    })
  })
  describe("deleteUser", () => {
    it("should delete the user and return { success: true }", async () => {
      await users.insertOne(mockUser)

      const { success } = await UsersDAO.deleteUser(mockUser.email)
      const user = await users.findOne({ email: mockUser.email })

      expect(success).toEqual(true)
      expect(user).toBeNull()
    })
  })
})
