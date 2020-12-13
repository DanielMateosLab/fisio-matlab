import { Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { logoutSuccess } from "./sessionSlice"

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <Button
      onClick={() => {
        dispatch(logoutSuccess())
      }}
    >
      Cerrar sesión
    </Button>
  )
}

export default LogoutButton
