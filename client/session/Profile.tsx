import { useRouter } from "next/router"
import { useEffect } from "react"
import { useTypedSelector } from "../redux/rootReducer"

const Profile: React.FC = () => {
  const router = useRouter()
  const email = useTypedSelector((state) => state.session.email)

  useEffect(() => {
    if (!email) {
      router.push("/login")
    }
  }, [email])

  return <div></div>
}

export default Profile
