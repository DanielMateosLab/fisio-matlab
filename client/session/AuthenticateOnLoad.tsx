import Cookies from "js-cookie"
import { login, sessionCookieName } from "./sessionSlice"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useThunkDispatch } from "../redux/store"

// This component will in the future dispatch a getUser action, and will return a
// "loading" component while session.getUserPending is true

const AuthenticateOnLoad: React.FC = ({ children }) => {
  const dispatch = useThunkDispatch()
  const email = Cookies.get(sessionCookieName)
  const router = useRouter()

  useEffect(() => {
    if (email) {
      dispatch(login({ email, password: "mock" })).then(() =>
        router.push("/profile")
      )
    }
  }, [])

  return <>{children}</>
}

export default AuthenticateOnLoad
