import { ExtendedRequest } from "./types"

export const logIn = (req: ExtendedRequest, email: string) => {
  req.session.email = email
}

export const isLoggedIn = (req: ExtendedRequest): boolean => !!req.session.email
