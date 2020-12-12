import { Button, Link, makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import FormikTextInput from "../clientShared/FormikTextInput"
import PageTitle from "../clientShared/pageTitle"
import { loginValidationSchema } from "../clientShared/Validation"
import { authSuccess } from "./sessionSlice"

export const loginTitle = "¿Quién eres?"
export const emailInputText = "Tu email"
export const passwordInputText = "Tu contraseña"
export const submitButtonText = "Iniciar sesión"

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
}))

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()

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
        onSubmit={(values, { setSubmitting }) => {
          dispatch(authSuccess({ email: values.email }))
          setSubmitting(false)
        }}
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
