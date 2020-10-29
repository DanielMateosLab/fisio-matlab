import { makeStyles, Typography } from "@material-ui/core"

export const signupComponentTitle =
  "¡Buena elección! Para comenzar solo necesitamos..."

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}))

const Signup = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant="h6" component="h2" align="center">
        {signupComponentTitle}
      </Typography>
    </div>
  )
}

export default Signup
