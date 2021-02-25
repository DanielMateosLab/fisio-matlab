import { UsersGetResponse } from "appShared/types"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { fetcher } from "server/apiUtils"
import { useThunkDispatch } from "../redux/store"
import { authenticate, sessionActiveCookieName } from "./sessionSlice"

// This component will in the future dispatch a getUser action, and will return a
// "loading" component while session.getUserPending is true

const ParseSessionOnLoad: React.FC = ({ children }) => {
  const dispatch = useThunkDispatch()
  const sessionActive = Cookies.get(sessionActiveCookieName)

  useEffect(() => {
    ;(async () => {
      if (sessionActive) {
        const res = (await fetcher("/api/users/me")) as UsersGetResponse
        if (res.status == "success") {
          dispatch(authenticate(res.user.email))
        }
      }
    })()
  }, [])

  return <>{children}</>
}

export default ParseSessionOnLoad
