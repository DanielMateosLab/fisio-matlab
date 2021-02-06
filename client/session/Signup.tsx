import React, { useEffect, useState } from "react"
import { Button, Link, makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { useRouter } from "next/router"
import FormikTextInput from "../clientShared/FormikTextInput"
import { signupValidationSchema } from "../../appShared/Validation"
import PageTitle from "../clientShared/pageTitle"
import useRedirectAuth from "../clientShared/useRedirectAuth"
import { useThunkDispatch } from "../redux/store"
import { fetchPostOrPut } from "server/apiUtils"
import { UsersPostResponse } from "appShared/types"
import { authFulfilled } from "./sessionSlice"

export const signupComponentTitle =
  "¡Buena elección! Para comenzar solo necesitamos..."
export const emailInputText = "Tu email"
export const passwordInputText = "Una contraseña"
export const repeatPasswordInputText = "Que repitas tu contraseña"
export const submitButtonText = "¡Dale candela!"
export const signupFormError =
  "No se ha podido completar el registro. Vuelve a intentarlo más tarde."

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

const Signup: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useThunkDispatch()
  const [signupError, setSignupError] = useState("")

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
          try {
            const { email, payload } = (await fetchPostOrPut(
              "/api/users",
              values
            )) as UsersPostResponse
            if (email) {
              dispatch(authFulfilled({ email }))
              router.push("/profile")
            } else if (payload) {
              setErrors(payload)
            } else {
              /*  If there is no email or payload, an error happened, but we don't want
              to give details to the client, so we throw null to pass control to the catch
              block, where a default error message is set. */
              throw null
            }
          } catch (e) {
            setSignupError(signupFormError)
          } finally {
            setSubmitting(false)
          }
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
