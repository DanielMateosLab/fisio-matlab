import * as yup from "yup"
import {
  emailErrorText,
  emailValidation,
  newPasswordValidation,
  repeatPasswordErrorText,
  repeatPasswordValidator,
  currentPasswordValidation,
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
    expectValidationError(emailValidation.validator, testString, expectedError)
  }

  test("the email validation should fail with a random word", () => {
    const testString = "aaaa"

    expectEmailValidationError(testString, emailErrorText)
  })
  test("the email validation should fail with an empty email", () => {
    const testString = undefined

    expectEmailValidationError(testString, emailValidation.requiredErrorText)
  })
  test("the email validation should fail with a 257 characters email", () => {
    const testString = "a".repeat(250) + "@aaa.aa"

    expectEmailValidationError(testString, emailValidation.maxErrorText)
  })
  test("the email validation should pass", () => {
    const testString = "aaaaa@aaaa.com"

    expect(() => {
      emailValidation.validator.validateSync(testString)
    }).not.toThrow()
  })
})

describe("new password validation", () => {
  function expectPasswordValidationError(
    testString: TestString,
    expectedError: string
  ) {
    expectValidationError(
      newPasswordValidation.validator,
      testString,
      expectedError
    )
  }
  test("the password validation should fail with no input", () => {
    const testString = undefined

    expectPasswordValidationError(
      testString,
      newPasswordValidation.requiredErrorText
    )
  })
  test("the password validation should fail with less characters than the minium length allowed", () => {
    const testString = "a".repeat(newPasswordValidation.minCharacters - 1)

    expectPasswordValidationError(
      testString,
      newPasswordValidation.minErrorText
    )
  })
  test("the password validation should fail with more characters than the maxium length allowed", () => {
    const testString = "a".repeat(newPasswordValidation.maxCharacters + 1)

    expectPasswordValidationError(
      testString,
      newPasswordValidation.maxErrorText
    )
  })
  test("the password validation should pass with a 20 letters password", () => {
    const testString = "a".repeat(20)

    expect(() =>
      newPasswordValidation.validator.validateSync(testString)
    ).not.toThrow()
  })
})

describe("current password validation", () => {
  function expectPasswordValidationError(
    testString: TestString,
    expectedError: string
  ) {
    expectValidationError(
      currentPasswordValidation.validator,
      testString,
      expectedError
    )
  }
  test("the password validation should fail with no input", () => {
    const testString = undefined

    expectPasswordValidationError(
      testString,
      currentPasswordValidation.requiredErrorText
    )
  })
  test("the password validation should pass with a 20 letters password", () => {
    const testString = "a".repeat(20)

    expect(() =>
      currentPasswordValidation.validator.validateSync(testString)
    ).not.toThrow()
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
