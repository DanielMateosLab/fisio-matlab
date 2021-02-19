import { Button, Link, makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { loginValidationSchema } from "../../appShared/Validation"
import FormikTextInput from "../clientShared/FormikTextInput"
import PageTitle from "../clientShared/pageTitle"
import useRedirectAuth from "../clientShared/useRedirectAuth"
import { useTypedSelector } from "../redux/rootReducer"
import { useThunkDispatch } from "../redux/store"
import handleAuthResponse from "./handleAuthResponse"

export const loginTitle = "¿Quién eres?"
export const emailInputText = "Tu email"
export const passwordInputText = "Tu contraseña"
export const submitButtonText = "Iniciar sesión"
export const loginFormError =
  "No se ha podido iniciar sesión. Vuelve a intentarlo más tarde."
export const invalidCredentialsMessage = "Email o contraseña incorrectas."

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formElement: {
    marginTop: theme.spacing(2),
  },
  successColor: {
    color: theme.palette.success.dark,
  },
}))

export const changedPasswordText =
  "¡Ya tienes nueva contraseña! Debes volver a iniciar sesión."

const Login = () => {
  const classes = useStyles()
  const dispatch = useThunkDispatch()
  const router = useRouter()
  const [formError, setFormError] = useState("")
  const { changedPassword } = useTypedSelector((state) => state.session)

  useEffect(() => {
    router.prefetch("/profile")
  }, [])

  useRedirectAuth()

  function handleSignupPageLink(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault()
    router.push("/signup")
  }

  return (
    <div className={classes.container}>
      <PageTitle> {loginTitle} </PageTitle>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, helpers) =>
          await handleAuthResponse(
            values,
            helpers,
            setFormError,
            dispatch,
            router,
            loginFormError,
            "login"
          )
        }
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.formElement}>
              <FormikTextInput
                name="email"
                label={emailInputText}
                type="email"
              />
            </div>
            <div className={classes.formElement}>
              <FormikTextInput
                name="password"
                label={passwordInputText}
                type="password"
              />
            </div>
            {changedPassword && (
              <div className={classes.formElement}>
                <Typography variant="body1" className={classes.successColor}>
                  {changedPasswordText}
                </Typography>
              </div>
            )}
            {formError && (
              <div className={classes.formElement}>
                <Typography color="error">{formError}</Typography>
              </div>
            )}
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
            <div className={classes.formElement}>
              <Typography variant="body2">
                ¿No tienes cuenta?{" "}
                <Link href="#" onClick={handleSignupPageLink}>
                  Regístrate
                </Link>
              </Typography>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Login
