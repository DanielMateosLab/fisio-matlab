import { Button, Typography } from "@material-ui/core"
import { useTypedSelector } from "../redux/rootReducer"
import FlexSpace from "./FlexSpace"
import { useDispatch } from "react-redux"
import { logoutSuccess } from "../session/sessionSlice"
import { logoutButtonText } from "./Header"
import { useRouter } from "next/router"

const BigScreenMenu: React.FC = () => {
  const dispatch = useDispatch()
  const email = useTypedSelector((state) => state.session.email)
  const router = useRouter()

  const LogoutButton = () => (
    <Button
      onClick={() => {
        dispatch(logoutSuccess())
      }}
    >
      {logoutButtonText}
    </Button>
  )

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
          <LogoutButton />
        </div>
      )}
    </>
  )
}

export default BigScreenMenu
