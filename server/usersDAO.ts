import bcrypt from "bcryptjs"
import { Collection, MongoClient } from "mongodb"
import { appName } from "../appShared/appData"
import { FieldValidationError } from "../appShared/errors"
import { User } from "./types"

let users: Collection<User>

export default class UsersDAO {
  static injectDB(mongoClient: MongoClient): void {
    if (users) {
      return
    }
    users = mongoClient.db(appName).collection("users")
  }
  static async addUser(user: User) {
    const alreadyExists = await users.findOne({ email: user.email })
    if (alreadyExists) {
      throw new FieldValidationError<User>({
        email: "Ya existe un usuario con ese correo electrónico.",
      })
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
    return await users.findOne({ email })
  }
  static async updateUserPassword(password: string) {}
}
