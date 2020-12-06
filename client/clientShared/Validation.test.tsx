import * as yup from "yup"
import { emailErrorText, emailValidation } from "./Validation"

function expectValidationError(
  validator: yup.StringSchema,
  testString: string,
  expectedError: string
) {
  expect(() => {
    validator.validateSync(testString)
  }).toThrowError(expectedError)
}

describe("email validation", () => {
  function expectEmailValidationError(
    testString: string,
    expectedError: string
  ) {
    expectValidationError(emailValidation.validator, testString, expectedError)
  }

  test("the email validation should fail with a random word", () => {
    const testString = "aaaa"

    expectEmailValidationError(testString, emailErrorText)
  })
  test("the email validation should fail with an empty email", () => {
    const testString = ""

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

describe("password validation", () => {
  test.todo("the password validation should fail with no input")
  test.todo(
    "the password validation should fail with less characters than the minium length allowed"
  )
  test.todo(
    "the password validation should fail with more characters than the maxium length allowed"
  )
  test.todo("the password validation should pass with a 20 letters password")
})
