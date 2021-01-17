import session from "express-session"
import mongoStore from "connect-mongodb-session"
import { MissingEnvVarError } from "../appShared/errors"

const MongoStore = mongoStore(session)

const secret = process.env.SESS_SECRET
if (!secret) throw new MissingEnvVarError("SESS_SECRET")

const uri = process.env.DB_URI
if (!uri) throw new MissingEnvVarError("DB_URI")

const sess = {
  secret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  store: new MongoStore({
    uri,
    databaseName: "sessions",
    collection: "sessions",
    connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  saveUninitialized: true,
  resave: true,
}

export default session(sess)
