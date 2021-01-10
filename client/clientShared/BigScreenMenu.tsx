import { Button, Typography } from "@material-ui/core"
import FlexSpace from "./FlexSpace"
import { logoutButtonText } from "./Header"
import { useRouter } from "next/router"
import { useAuth0 } from "@auth0/auth0-react"

const BigScreenMenu: React.FC = () => {
  const { user, logout } = useAuth0()
  const email = user && (user.email || user.nickname)

  const router = useRouter()

  return (
    <>
      <FlexSpace />
      {email && (
        <div>
          <Typography
            variant="body1"
            align="center"
            onClick={() => {
              router.push("/profile")
            }}
            style={{ cursor: "pointer" }}
          >
            {email}
          </Typography>
        </div>
      )}
      <FlexSpace />
      {email && (
        <div>
          <Button onClick={() => logout()}>{logoutButtonText}</Button>
        </div>
      )}
    </>
  )
}

export default BigScreenMenu
