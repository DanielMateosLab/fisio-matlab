import { MongoClient } from "mongodb"
import { NextApiResponse } from "next"
import { MissingEnvVarError } from "../../appShared/errors"
import { ExtendedRequest } from "../types"

let conn: MongoClient | undefined

// HOC with the conn as parameter that returns the handler. Allows us to test it with a mock conn
export const onClose = (conn: MongoClient | undefined) => () => {
  if (conn && conn.isConnected) {
    conn.close().catch(() => {})
  }
}

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

  res.addListener("close", onClose(conn))
}

// For testing purposes only
export function resetConn() {
  conn = undefined
}
