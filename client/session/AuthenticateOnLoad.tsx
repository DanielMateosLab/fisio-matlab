import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useThunkDispatch } from "../redux/store"
import { sessionCookieName } from "./sessionSlice"

// This component will in the future dispatch a getUser action, and will return a
// "loading" component while session.getUserPending is true

const AuthenticateOnLoad: React.FC = ({ children }) => {
  const dispatch = useThunkDispatch()
  const sessionActive = Cookies.get(sessionCookieName)
  const router = useRouter()

  useEffect(() => {
    if (sessionActive) {
      // TODO: call the api to get the user
    }
  }, [])

  return <>{children}</>
}

export default AuthenticateOnLoad
