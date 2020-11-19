import * as yup from "yup"

export function getMaxErrorText(max: number): string {
  return `Debe tener ${max} o menos caracteres`
}
export function getMinErrorText(min: number): string {
  return `Debe tener ${min} o más caracteres`
}
export const requiredErrorText = "Campo obligatorio"

export const emailErrorText = "La dirección de correo electrónico no es válida"
export const emailMaxCharacters = 256
const email = yup
  .string()
  .email(emailErrorText)
  .max(emailMaxCharacters, getMaxErrorText(emailMaxCharacters))
  .required(requiredErrorText)

export const passwordMinCharacters = 5
export const passwordMaxCharacters = 128
const password = yup
  .string()
  .required(requiredErrorText)
  .min(passwordMinCharacters, getMinErrorText(passwordMinCharacters))
  .max(passwordMaxCharacters, getMaxErrorText(passwordMaxCharacters))

export const repeatPasswordErrorText = "Las contraseñas deben coincidir"
const repeatPassword = yup
  .string()
  .test("matchPasswords", repeatPasswordErrorText, function (value) {
    return this.parent.password === value
  })

export const signUpFormValidationSchema = yup.object().shape({
  email,
  password,
  repeatPassword,
})
