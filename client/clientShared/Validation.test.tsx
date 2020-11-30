import { emailErrorText, emailValidator } from "./Validation"

describe("email validation", () => {
  test("the email validation should fail with a random word", async () => {
    const testString = "aaaa"

    expect(() => {
      emailValidator.validateSync(testString)
    }).toThrowError(emailErrorText)
  })
})
