import * as yup from "yup"
import {
  email,
  emailErrorText,
  getMaxErrorText,
  newPassword,
  repeatPasswordErrorText,
  repeatPasswordValidator,
  emailMaxCharacters,
  requiredErrorText,
  passwordMinCharacters,
  passwordMaxCharacters,
  getMinErrorText,
  currentPassword,
} from "./Validation"

type TestString = string | undefined

function expectValidationError(
  validator: yup.StringSchema,
  testString: TestString,
  expectedError: string
) {
  expect(() => {
    validator.validateSync(testString)
  }).toThrowError(expectedError)
}

describe("email validation", () => {
  function expectEmailValidationError(
    testString: TestString,
    expectedError: string
  ) {
    expectValidationError(email, testString, expectedError)
  }

  test("the email validation should fail with a random word", () => {
    const testString = "aaaa"

    expectEmailValidationError(testString, emailErrorText)
  })
  test("the email validation should fail with an empty email", () => {
    const testString = undefined

    expectEmailValidationError(testString, requiredErrorText)
  })
  test("the email validation should fail with a 257 characters email", () => {
    const testString = "a".repeat(250) + "@aaa.aa"

    expectEmailValidationError(testString, getMaxErrorText(emailMaxCharacters))
  })
  test("the email validation should pass", () => {
    const testString = "aaaaa@aaaa.com"

    expect(() => {
      email.validateSync(testString)
    }).not.toThrow()
  })
})

describe("new password validation", () => {
  function expectPasswordValidationError(
    testString: TestString,
    expectedError: string
  ) {
    expectValidationError(newPassword, testString, expectedError)
  }
  test("the password validation should fail with no input", () => {
    const testString = undefined

    expectPasswordValidationError(testString, requiredErrorText)
  })
  test("the password validation should fail with less characters than the minium length allowed", () => {
    const testString = "a".repeat(passwordMinCharacters - 1)

    expectPasswordValidationError(
      testString,
      getMinErrorText(passwordMinCharacters)
    )
  })
  test("the password validation should fail with more characters than the maxium length allowed", () => {
    const testString = "a".repeat(passwordMaxCharacters + 1)

    expectPasswordValidationError(
      testString,
      getMaxErrorText(passwordMaxCharacters)
    )
  })
  test("the password validation should pass with a 20 letters password", () => {
    const testString = "a".repeat(20)

    expect(() => newPassword.validateSync(testString)).not.toThrow()
  })
})

describe("current password validation", () => {
  function expectPasswordValidationError(
    testString: TestString,
    expectedError: string
  ) {
    expectValidationError(currentPassword, testString, expectedError)
  }
  test("the password validation should fail with no input", () => {
    const testString = undefined

    expectPasswordValidationError(testString, requiredErrorText)
  })
  test("the password validation should pass with a 20 letters password", () => {
    const testString = "a".repeat(20)

    expect(() => currentPassword.validateSync(testString)).not.toThrow()
  })
  test("the password validation should fail with more characters than the maxium length allowed", () => {
    const testString = "a".repeat(passwordMaxCharacters + 1)

    expectPasswordValidationError(
      testString,
      getMaxErrorText(passwordMaxCharacters)
    )
  })
})

describe("repeatPassword validation", () => {
  it("should fail if the password is different", () => {
    const password = "aaaa"
    const repeatPassword = "bbbb"

    const passwordsSchema = yup.object().shape({
      password: yup.string(),
      repeatPassword: repeatPasswordValidator,
    })
    expect(() => {
      passwordsSchema.validateSync({ password, repeatPassword })
    }).toThrowError(repeatPasswordErrorText)
  })
})
