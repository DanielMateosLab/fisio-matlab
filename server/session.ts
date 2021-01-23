import session from "express-session"
import connectMongo from "connect-mongodb-session"
import { MissingEnvVarError } from "../appShared/errors"

const MongoStore = connectMongo(session)

const secret = process.env.SESS_SECRET
if (!secret) throw new MissingEnvVarError("SESS_SECRET")

const uri = process.env.DB_URI
if (!uri) throw new MissingEnvVarError("DB_URI")

const sess: session.SessionOptions = {
  secret,
  cookie: {
    maxAge: 1000 * 60 * 30, // HALF AN HOUR
    secure: process.env.NODE_ENV == "production" ? true : false,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    uri,
    databaseName: "auth",
    collection: "sessions",
    connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
}

export default session(sess)
