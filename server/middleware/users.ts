import { InternalServerError } from "appShared/errors"
import { Middleware } from "server/types"
import UsersDAO from "server/usersDAO"

const users: Middleware = (req, res) => {
  if (!req.conn) throw new InternalServerError("Missing db connection.")

  UsersDAO.injectDb(req.conn)
}

export default users
