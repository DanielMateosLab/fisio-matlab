import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import FormikTextInput from "../clientShared/FormikTextInput"
import useRedirectUnauth from "../clientShared/useRedirectUnauth"
import { changePasswordValidationSchema } from "../clientShared/Validation"
import { useTypedSelector } from "../redux/rootReducer"

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formElement: {
    marginTop: theme.spacing(2),
  },
}))

export const currentPasswordInputText = "Contraseña actual"
export const newPasswordInputText = "Nueva contraseña"
export const repeatNewPasswordInputText = "Repite la nueva contraseña"
export const submitButtonText = "Cambiar contraseña"

const Profile: React.FC = () => {
  useRedirectUnauth()
  const classes = useStyles()
  const email = useTypedSelector((state) => state.session.email)

  const Subtitle: React.FC = ({ children }) => (
    <Typography variant="h5" gutterBottom>
      {children}
    </Typography>
  )

  // TODO: maybe make a grid layout to have two columns (it could just be flexbox)
  // TODO: logout after successful password change. Kill all user sessions when changing pwd.
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
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            repeatPassword: "",
          }}
          validationSchema={changePasswordValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <div className={classes.formElement}>
                <FormikTextInput
                  name="currentPassword"
                  label={currentPasswordInputText}
                  type="currentPassword"
                />
              </div>
              <div className={classes.formElement}>
                <FormikTextInput
                  name="password"
                  label={newPasswordInputText}
                  type="password"
                />
              </div>
              <div className={classes.formElement}>
                <FormikTextInput
                  name="repeatPassword"
                  label={repeatNewPasswordInputText}
                  type="password"
                />
              </div>
              <div className={classes.formElement}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {submitButtonText}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </Container>
  )
}

export default Profile
