import { Container, makeStyles, Typography } from "@material-ui/core"
import useRedirectUnauth from "../clientShared/useRedirectUnauth"
import { useTypedSelector } from "../redux/rootReducer"

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "16px",
  },
}))

const Profile: React.FC = () => {
  useRedirectUnauth()
  const classes = useStyles()
  const email = useTypedSelector((state) => state.session.email)

  const Subtitle: React.FC = ({ children }) => (
    <Typography variant="h5" gutterBottom>
      {children}
    </Typography>
  )

  return (
    <Container className={classes.container} maxWidth="sm" component="main">
      <Typography variant="h3" component="h2" gutterBottom>
        Perfil
      </Typography>
      <section>
        <Subtitle>Correo electrónico</Subtitle>
        <Typography variant="body1" gutterBottom>
          {email}
        </Typography>
      </section>
      <section>
        <Subtitle>Cambiar contraseña</Subtitle>
        <Typography variant="body1">
          Aquí puedes cambiar la contraseña que utilizas para iniciar sesión.
        </Typography>
      </section>
    </Container>
  )
}

export default Profile
