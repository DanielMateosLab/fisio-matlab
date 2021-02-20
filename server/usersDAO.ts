import { emailErrorText } from "appShared/Validation"
import bcrypt from "bcryptjs"
import { Collection, MongoClient } from "mongodb"
import { ValidationError } from "yup"
import { dbName } from "../appShared/appData"
import { UserNotFoundError } from "../appShared/errors"
import { DAOResponse, User } from "./types"

let users: Collection<User>

export default class UsersDAO {
  static injectDb(conn: MongoClient): void {
    if (users) {
      return
    }
    users = conn.db(dbName).collection("users")
  }

  /** Utility function to mock the users collection in tests */
  static setUsersCollection(
    mockUsersCollection: Partial<Collection<User>> | undefined
  ) {
    if (process.env.NODE_ENV !== "test") {
      throw "setDb() can only be used for testing purposes. Use injectDb instead."
    }
    users = mockUsersCollection as any
  }

  static async addUser(user: User) {
    const alreadyExists = await users.findOne({ email: user.email })
    if (alreadyExists) {
      throw new ValidationError(emailErrorText, user.email, "email")
    }

    const insertedUser = await users
      .insertOne({
        ...user,
        password: await bcrypt.hash(user.password, 12),
      })
      .then((r) => r.ops[0])

    return insertedUser
  }

  static async getUserByEmail(email: string) {
    // TODO: put an index in the users.email field
    return await users.findOne({ email })
  }

  static async updateUserPassword(
    email: string,
    password: string
  ): Promise<DAOResponse> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await users.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    )

    if (result.matchedCount == 0) {
      throw new UserNotFoundError()
    }

    return { success: true }
  }

  static async deleteUser(email: string): Promise<DAOResponse> {
    const result = await users.deleteOne({ email })
    if (result.deletedCount == 1) {
      return { success: true }
    } else {
      throw {
        name: "UserNotDeletedError",
        message:
          "No se ha podido eliminar el usuario. Prueba de nuevo más tarde",
      }
    }
  }
}
