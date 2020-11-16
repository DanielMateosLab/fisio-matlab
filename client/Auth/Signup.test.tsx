import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react"
import Signup, { signupComponentTitle, emailInputText } from "./Signup"
import userEvent from "@testing-library/user-event"
import { getMaxErrorText } from "../clientShared/Validation"

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
    describe("email input", () => {
      let emailInputElement: HTMLElement

      beforeEach(() => {
        emailInputElement = queries.getByLabelText(emailInputText)
      })

      it("should have an email input", () => {
        expect(emailInputElement).toBeInTheDocument()
      })
      test("the email validation should fail with a random word", async () => {
        userEvent.type(emailInputElement, "aaaaa")
        userEvent.tab()

        await waitFor(() => {
          expect(emailInputElement).toBeInvalid()
          const errorText = queries.getByText(
            "La dirección de correo electrónico no es válida"
          )
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the email validation should fail with an empty email", async () => {
        userEvent.type(emailInputElement, "")
        userEvent.tab()

        await waitFor(() => {
          expect(emailInputElement).toBeInvalid()
          const errorText = queries.getByText("Campo obligatorio")
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the email validation should fail with a 257 characters email", async () => {
        userEvent.type(
          emailInputElement,
          "a".repeat(250) + "@aa.aaa" // 250 chars + 7
        )
        userEvent.tab()

        await waitFor(() => {
          expect(emailInputElement).toBeInvalid()
          const errorText = queries.getByText(getMaxErrorText(256))
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the email validation should pass with a valid email", async () => {
        userEvent.type(emailInputElement, "aaaaa@aaaa.com")
        userEvent.tab()

        await waitFor(() => {
          expect(emailInputElement).toBeValid()
        })
      })
    })

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
