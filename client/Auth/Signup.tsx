import { makeStyles, Typography } from "@material-ui/core"
import { Formik } from "formik"
import FormikTextInput from "../clientShared/FormikTextInput"
import { signUpFormValidationSchema } from "../clientShared/Validation"

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

  return (
    <div className={classes.container}>
      <Typography variant="h6" component="h2" align="center" gutterBottom>
        {signupComponentTitle}
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={signUpFormValidationSchema}
        onSubmit={(values) => console.log(values)}
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
              <button type="submit"> {submitButtonText} </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Signup
