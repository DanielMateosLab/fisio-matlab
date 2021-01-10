import { useAuth0 } from "@auth0/auth0-react"
import {
  Link,
  Link as MaterialLink,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { appName } from "../../appShared/appData"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
  },
  topMarginDiv: { flexGrow: 0.33 },
  link: {
    cursor: "pointer",
  },
})

const AuthenticationRequired: React.FC = () => {
  const classes = useStyles()
  const { loginWithPopup } = useAuth0()

  return (
    <main className={classes.container}>
      <div className={classes.topMarginDiv} />
      <Typography variant="h2">{appName}</Typography>
      <Typography>
        Necesitas{" "}
        <MaterialLink href="#" onClick={() => loginWithPopup()}>
          iniciar sesión o registrate
        </MaterialLink>{" "}
        para continuar.
      </Typography>
      <Typography>
        También puedes volver a la<Link href="/"> página principal</Link>.
      </Typography>
    </main>
  )
}

export default AuthenticationRequired
