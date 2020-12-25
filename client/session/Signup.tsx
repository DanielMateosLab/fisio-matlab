import React, { useEffect } from "react"
import { Button, Link, makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { useRouter } from "next/router"
import FormikTextInput from "../clientShared/FormikTextInput"
import { signupFormValidationSchema } from "../clientShared/Validation"
import { useDispatch } from "react-redux"
import { authSuccess } from "./sessionSlice"
import PageTitle from "../clientShared/pageTitle"
import { useTypedSelector } from "../redux/rootReducer"

export const signupComponentTitle =
  "¡Buena elección! Para comenzar solo necesitamos..."
export const emailInputText = "Tu email"
export const passwordInputText = "Una contraseña"
export const repeatPasswordInputText = "Que repitas tu contraseña"
export const submitButtonText = "¡Dale candela!"

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

const Signup = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()

  const email = useTypedSelector((state) => state.session.email)
  useEffect(() => {
    if (email) {
      router.push("/profile")
    }
  }, [email])
  // TODO: write a hook for the route protection

  function handleLoginPageLink(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault()
    router.push("/login")
  }

  return (
    <div className={classes.container}>
      <PageTitle> {signupComponentTitle} </PageTitle>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={signupFormValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(authSuccess({ email: values.email }))
          router.push("/profile")
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
              <FormikTextInput
                name="repeatPassword"
                label={repeatPasswordInputText}
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
                ¿Ya tienes cuenta?{" "}
                <Link href="#" onClick={handleLoginPageLink}>
                  Inicia sesión
                </Link>
              </Typography>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Signup
