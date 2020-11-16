import * as yup from "yup"

export function getMaxErrorText(max: number): string {
  return `Debe tener ${max} o menos caracteres`
}
export const requiredErrorText = "Campo obligatorio"

const emailMaxCharacters = 256
const email = yup
  .string()
  .email("La dirección de correo electrónico no es válida")
  .max(emailMaxCharacters, getMaxErrorText(emailMaxCharacters))
  .required(requiredErrorText)

export const signUpFormValidationSchema = yup.object().shape({
  email,
})
