import React from "react"
import { Button, Link, makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { useRouter } from "next/router"
import FormikTextInput from "../clientShared/FormikTextInput"
import { signUpFormValidationSchema } from "../clientShared/Validation"
import { useDispatch } from "react-redux"
import { authSuccess } from "./sessionSlice"
import PageTitle from "../clientShared/pageTitle"

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
    marginTop: theme.spacing(1),
  },
}))

const Signup = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()

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
        validationSchema={signUpFormValidationSchema}
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
