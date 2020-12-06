import * as yup from "yup"
import {
  emailErrorText,
  emailMaxErrorText,
  emailValidator,
  requiredErrorText,
} from "./Validation"

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
    expectValidationError(emailValidator, testString, expectedError)
  }

  test("the email validation should fail with a random word", () => {
    const testString = "aaaa"

    expectEmailValidationError(testString, emailErrorText)
  })
  test("the email validation should fail with an empty email", () => {
    const testString = ""

    expectEmailValidationError(testString, requiredErrorText)
  })
  test("the email validation should fail with a 257 characters email", () => {
    const testString = "a".repeat(250) + "@aaa.aa"

    expectEmailValidationError(testString, emailMaxErrorText)
  })
  test("the email validation should pass", () => {
    const testString = "aaaaa@aaaa.com"

    expect(() => {
      emailValidator.validateSync(testString)
    }).not.toThrow()
  })
})
