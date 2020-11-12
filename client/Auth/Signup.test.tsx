import { render, RenderResult } from "@testing-library/react"
import Signup, { signupComponentTitle, emailInputText } from "./Signup"
import userEvent from "@testing-library/user-event"

describe("Signup", () => {
  let queries: RenderResult
  let getByText: typeof queries.getByText

  beforeEach(() => {
    queries = render(<Signup />)
    getByText = queries.getByText
  })

  it("should render the signup component title", () => {
    const titleElement = getByText(signupComponentTitle)

    expect(titleElement).toBeInTheDocument()
  })

  describe("Form", () => {
    it("should have an email input", () => {
      const emailInputElement = queries.getByLabelText(emailInputText)

      expect(emailInputElement).toBeInTheDocument()
    })
    test("the email validation should fail with a random word", () => {
      const emailInputElement = queries.getByLabelText(emailInputText)
      userEvent.type(emailInputElement, "aaaaa")
      userEvent.tab()

      expect(emailInputElement).toBeInvalid()
    })
    test.todo("the email validation should pass with a valid email")
    it.todo("should have a password input")
    test.todo("the password validation should fail with less than 5 letters")
    test.todo("the password validation should pass with 5 letters or more")
    it.todo("should have a repeat password input")
    test.todo("the repeatPassword field value should match the password value")
    it.todo("should have a submit button")
    test.todo(
      "the submit button should be disabled while the form is being submitted"
    )
    it.todo("should have a link to go to the login page")
    it.todo(
      "should persist the form data in the local storage until the signup is completed"
    )
  })

  //TODO: store
})
