import * as yup from "yup"
import { LoginData, SignupData } from "appShared/types"

export const requiredErrorText = "Campo obligatorio"
export const getMaxErrorText = (max: number) =>
  `Debe tener ${max} o menos caracteres`
export const getMinErrorText = (min: number) =>
  `Debe tener ${min} o más caracteres`

// Email Validation
export const emailMaxCharacters = 256
export const emailErrorText = "La dirección de correo electrónico no es válida"
export const email = yup
  .string()
  .required(requiredErrorText)
  .max(emailMaxCharacters, ({ max }) => `Debe tener ${max} o menos caracteres`)
  .email(emailErrorText)

// Signup Password Validation
export const passwordMinCharacters = 8
export const passwordMaxCharacters = 72
export const newPassword = yup
  .string()
  .max(
    passwordMaxCharacters,
    ({ max }) => `Debe tener ${max} o menos caracteres`
  )
  .min(passwordMinCharacters, ({ min }) => `Debe tener ${min} o más caracteres`)
  .required(requiredErrorText)

// Repeat Password Validation
export const repeatPasswordErrorText = "Las contraseñas deben coincidir"
export const repeatPasswordValidator = yup
  .string()
  .required(requiredErrorText)
  .test("matchPasswords", repeatPasswordErrorText, function (value) {
    return this.parent.password === value
  })

// Login Password Validation (no min length)
export const currentPassword = yup
  .string()
  .max(
    passwordMaxCharacters,
    ({ max }) => `Debe tener ${max} o menos caracteres`
  )
  .required(requiredErrorText)

// Form Schemas

export const signupValidationSchema = yup.object().shape<SignupData>({
  email,
  password: newPassword,
  repeatPassword: repeatPasswordValidator,
})

export const loginValidationSchema = yup.object().shape<LoginData>({
  email,
  password: currentPassword,
})

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword,
  password: newPassword,
  repeatPassword: repeatPasswordValidator,
})

export const deleteAccountValidationSchema = yup.object().shape({
  password: currentPassword,
})
