import { render } from "@testing-library/react"
import Signup, { signupComponentTitle } from "./Signup"

describe("Signup", () => {
  it("should render the signup component title", () => {
    const { getByText } = render(<Signup />)

    const titleElement = getByText(signupComponentTitle)

    expect(titleElement).toBeInTheDocument()
  })

  describe("Form", () => {
    it.todo("should have an email input")
    test.todo("the email validation should fail with a random word")
    test.todo("the email validation should pass with a valid email")
    it.todo("should have a password input")
    test.todo("the password validation should fail with less than 5 letters")
    test.todo("the password validation should pass with 5 letters or more")
    it.todo("should have a repeat password input")
    test.todo("the repeatPassword field value should match the password value")
    it.todo("should have a submit button")
    it.todo("should have a link to go to the login page")
    it.todo(
      "should persist the form data in the local storage until the signup is completed"
    )
  })

  //TODO: store
})
