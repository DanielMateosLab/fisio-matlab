import { Typography } from "@material-ui/core"
import Header from "../clientShared/Header"

export const loginTitle = "¿Quién eres?"

const Login = () => {
  return (
    <div>
      <Header />
      <Typography variant="h1" component="h2">
        {loginTitle}
      </Typography>
    </div>
  )
}

export default Login
