import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { login, sessionCookieName } from "./sessionSlice"
import { useEffect } from "react"

// This component will in the future dispatch a getUser action, and will return a
// "loading" component while session.getUserPending is true

const AuthenticateOnLoad: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const email = Cookies.get(sessionCookieName)

  useEffect(() => {
    if (email) {
      dispatch(login({ email, password: "mock" }))
    }
  }, [])

  return <>{children}</>
}

export default AuthenticateOnLoad
