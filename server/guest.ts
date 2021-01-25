import { isLoggedIn } from "./auth"
import { Middleware } from "./types"

export const guest: Middleware = (req, res) => {
  if (isLoggedIn(req)) {
    res.status(403).send({
      message:
        "Acción no permitida para usuarios. Cierra sesión y vuelve a intentarlo.",
    })
  }
}
