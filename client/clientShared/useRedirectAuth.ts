import { useRouter } from "next/router"
import { useEffect } from "react"
import useIsAuth from "./useIsAuth"

const useRedirectAuth = () => {
  const router = useRouter()
  const isAuth = useIsAuth()

  useEffect(() => {
    if (isAuth) {
      router.push("/profile")
    }
  }, [isAuth])
}

export default useRedirectAuth
