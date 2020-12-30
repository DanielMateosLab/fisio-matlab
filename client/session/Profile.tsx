import {
  Button,
  Container,
  makeStyles,
  Typography,
  TypographyProps,
} from "@material-ui/core"
import { Formik } from "formik"
import { useDispatch } from "react-redux"
import FormikTextInput from "../clientShared/FormikTextInput"
import useRedirectUnauth from "../clientShared/useRedirectUnauth"
import {
  changePasswordValidationSchema,
  deleteAccountValidationSchema,
} from "../clientShared/Validation"
import { useTypedSelector } from "../redux/rootReducer"
import { changePassword, deleteAccount } from "./sessionSlice"

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "16px",
    "& section": {
      marginBottom: "16px",
    },
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

export const deleteAccountTitle = "Eliminar cuenta"
export const deleteAccountDescription =
  "Al eliminar tu cuenta los datos se borrarán de nuestra base de datos de forma irreversible."
export const deleteAccountButtonText = "Eliminar cuenta"
export const deleteAccountWarningText =
  "¡Cuidado! Esta acción no tiene vuelta atrás. Introduce tu contraseña para continuar:"
export const deleteAccountPwdInputText = "Contraseña"

const Profile: React.FC = () => {
  useRedirectUnauth()
  const classes = useStyles()
  const email = useTypedSelector((state) => state.session.email)

  const dispatch = useDispatch()

  const Subtitle: React.FC<TypographyProps> = ({ children, ...props }) => (
    <Typography variant="h5" gutterBottom {...props}>
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
        <Typography>{email}</Typography>
      </section>
      <section>
        <Subtitle>Cambiar contraseña</Subtitle>
        <Typography>
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
            dispatch(changePassword())
            setSubmitting(false)
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <div className={classes.formElement}>
                <FormikTextInput
                  name="currentPassword"
                  label={currentPasswordInputText}
                  type="password"
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
      <section>
        <Formik
          initialValues={{
            password: "",
          }}
          validationSchema={deleteAccountValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(deleteAccount(values.password))
            setSubmitting(false)
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <Subtitle>{deleteAccountTitle}</Subtitle>
              <Typography>{deleteAccountDescription}</Typography>
              <Typography color="error" gutterBottom>
                {deleteAccountWarningText}
              </Typography>
              <div>
                <FormikTextInput
                  name="password"
                  label={deleteAccountPwdInputText}
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
                  {deleteAccountButtonText}
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
