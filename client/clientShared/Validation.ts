import * as yup from "yup"

class FieldValidationObject {
  maxCharacters: number
  minCharacters: number
  validator: yup.StringSchema
  requiredErrorText = "Campo obligatorio"
  maxErrorText: string
  minErrorText: string

  constructor(minCharacters: number, maxCharacters: number, required: boolean) {
    this.minCharacters = minCharacters
    this.maxCharacters = maxCharacters
    this.maxErrorText = `Debe tener ${maxCharacters} o menos caracteres`
    this.minErrorText = `Debe tener ${minCharacters} o más caracteres`
    this.validator = yup.string().max(maxCharacters, this.maxErrorText)

    if (minCharacters >= 1) {
      this.validator = this.validator.min(minCharacters, this.minErrorText)
    }
    if (required) {
      this.validator = this.validator.required(this.requiredErrorText)
    }
  }
}

const emailMaxCharacters = 256
export const emailValidation = new FieldValidationObject(
  0,
  emailMaxCharacters,
  true
)
export const emailErrorText = "La dirección de correo electrónico no es válida"
emailValidation.validator = emailValidation.validator.email(emailErrorText)

const passwordMinCharacters = 5
const passwordMaxCharacters = 128
export const passwordValidation = new FieldValidationObject(
  passwordMinCharacters,
  passwordMaxCharacters,
  true
)

export const repeatPasswordErrorText = "Las contraseñas deben coincidir"
export const repeatPasswordValidator = yup
  .string()
  .test("matchPasswords", repeatPasswordErrorText, function (value) {
    return this.parent.password === value
  })

export const signUpFormValidationSchema = yup.object().shape({
  email: emailValidation.validator,
  password: passwordValidation.validator,
  repeatPassword: repeatPasswordValidator,
})
