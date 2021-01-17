import { MongoClient } from "mongodb"
import { MissingEnvVarError } from "../appShared/errors"

let conn: MongoClient | undefined

export default async function connectToDb() {
  if (conn) return conn

  const DB_URI = process.env.DB_URI
  if (!DB_URI) throw new MissingEnvVarError("DB_URI")

  conn = await MongoClient.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return conn
}

// For testing purposes only
export function resetConn() {
  conn = undefined
}
