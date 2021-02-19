import { MongoClient } from "mongodb"
import { NextApiResponse } from "next"
import { MissingEnvVarError } from "../../appShared/errors"
import { ExtendedRequest } from "../types"

let conn: MongoClient | undefined

export default async function database(
  req: ExtendedRequest,
  res: NextApiResponse
): Promise<void> {
  if (!conn) {
    const DB_URI = process.env.DB_URI
    if (!DB_URI) throw new MissingEnvVarError("DB_URI")

    conn = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  req.conn = conn
}

// For testing purposes only
export function resetConn() {
  conn = undefined
}
