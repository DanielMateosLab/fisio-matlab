import React, { useEffect } from "react"
import { Button, Link, makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { useRouter } from "next/router"
import FormikTextInput from "../clientShared/FormikTextInput"
import { signupValidationSchema } from "../clientShared/Validation"
import { signup } from "./sessionSlice"
import PageTitle from "../clientShared/pageTitle"
import useRedirectAuth from "../clientShared/useRedirectAuth"
import { useThunkDispatch } from "../redux/store"
import { AsyncThunkAction } from "../clientShared/types"
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
  const dispatch = useThunkDispatch()
  const signupError = useTypedSelector((state) => state.session.signupError)

  useEffect(() => {
    router.prefetch("/profile")
  }, [])

  useRedirectAuth()

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
        validationSchema={signupValidationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          // TODO: extract this logic to a reusable function and write tests for it
          const { error, payload } = (await dispatch(
            signup(values)
          )) as AsyncThunkAction

          error && payload && setErrors({ ...payload })
          !error && router.push("/profile")

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
            {signupError && (
              <div className={classes.formElement}>
                <Typography color="error">{signupError}</Typography>
              </div>
            )}
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
