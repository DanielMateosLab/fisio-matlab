import { makeStyles, Typography } from "@material-ui/core"
import PageTitle from "../clientShared/pageTitle"

export const loginTitle = "¿Quién eres?"

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}))

const Login = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <PageTitle> {loginTitle} </PageTitle>
    </div>
  )
}

export default Login
