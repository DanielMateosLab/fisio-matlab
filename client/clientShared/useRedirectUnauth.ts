import { useRouter } from "next/router"
import { useEffect } from "react"
import useIsAuth from "./useIsAuth"

const useRedirectUnauth = () => {
  const router = useRouter()
  const isAuth = useIsAuth()

  useEffect(() => {
    if (!isAuth) {
      router.push("/login")
    }
  }, [isAuth])
}

export default useRedirectUnauth
