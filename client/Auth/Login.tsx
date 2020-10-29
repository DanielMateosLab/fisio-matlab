import { Typography } from "@material-ui/core"

export const loginTitle = "¿Quién eres?"

const Login = () => {
  return (
    <div>
      <Typography variant="h1" component="h2">
        {loginTitle}
      </Typography>
    </div>
  )
}

export default Login
