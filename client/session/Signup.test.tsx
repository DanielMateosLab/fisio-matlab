import { render, RenderResult, waitFor } from "../clientShared/testUtils"
import Signup, {
  signupComponentTitle,
  emailInputText,
  passwordInputText,
  repeatPasswordInputText,
  submitButtonText,
} from "./Signup"
import userEvent from "@testing-library/user-event"
import {
  emailErrorText,
  repeatPasswordErrorText,
  emailValidation,
  signupPasswordValidation,
} from "../clientShared/Validation"

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockPush,
    }
  },
}))
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch() {
    return mockDispatch
  },
}))

const mockPush = jest.fn()
const mockDispatch = jest.fn()

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
      // The following integration tests are not necessary as validation is tested separatedly
      test("the email validation should fail with a random word", async () => {
        userEvent.type(emailInputElement, "aaaaa")
        userEvent.tab()

        await waitFor(() => {
          expect(emailInputElement).toBeInvalid()
          const errorText = queries.getByText(emailErrorText)
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the email validation should fail with an empty email", async () => {
        userEvent.type(emailInputElement, "")
        userEvent.tab()

        await waitFor(() => {
          expect(emailInputElement).toBeInvalid()
          const errorText = queries.getByText(emailValidation.requiredErrorText)
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the email validation should fail with a 257 characters email", async () => {
        userEvent.type(
          emailInputElement,
          // maxChars + 1 (to make the test fail) - 7 letters of the email domain part
          "a".repeat(emailValidation.maxCharacters + 1 - 7) + "@aa.aaa"
        )
        userEvent.tab()

        await waitFor(() => {
          expect(emailInputElement).toBeInvalid()
          const errorText = getByText(emailValidation.maxErrorText)
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

    describe("password input", () => {
      let passwordInputElement: HTMLElement

      beforeEach(() => {
        passwordInputElement = queries.getByLabelText(passwordInputText)
      })

      it("should have a password input", () => {
        expect(passwordInputElement).toBeDefined()
      })
      // The following integration tests are not necessary as validation is tested separatedly
      test("the password validation should fail with no input", async () => {
        userEvent.type(passwordInputElement, "")
        userEvent.tab()

        await waitFor(() => {
          expect(passwordInputElement).toBeInvalid()
          const errorText = getByText(
            signupPasswordValidation.requiredErrorText
          )
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the password validation should fail with less characters than the minium length allowed", async () => {
        userEvent.type(
          passwordInputElement,
          "a".repeat(signupPasswordValidation.minCharacters - 1)
        )
        userEvent.tab()

        await waitFor(() => {
          expect(passwordInputElement).toBeInvalid()
          const errorText = getByText(signupPasswordValidation.minErrorText)
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the password validation should fail with more characters than the maxium length allowed", async () => {
        userEvent.type(
          passwordInputElement,
          "a".repeat(signupPasswordValidation.maxCharacters + 1)
        )
        userEvent.tab()

        await waitFor(() => {
          expect(passwordInputElement).toBeInvalid()
          const errorText = getByText(signupPasswordValidation.maxErrorText)
          expect(errorText).toBeInTheDocument()
        })
      })
      test("the password validation should pass with a 20 letters password", async () => {
        userEvent.type(passwordInputElement, "a".repeat(20))
        userEvent.tab()

        await waitFor(() => {
          expect(passwordInputElement).toBeValid()
        })
      })
    })

    describe("repeatPassword input", () => {
      let repeatPasswordElement: HTMLElement

      beforeEach(() => {
        repeatPasswordElement = queries.getByLabelText(repeatPasswordInputText)
      })

      it("should have a repeat password input", () => {
        expect(repeatPasswordElement).toBeInTheDocument()
      })
      test("the repeatPassword validation fails with different passwords", async () => {
        const passwordElement = queries.getByLabelText(passwordInputText)

        userEvent.type(passwordElement, "mockPassword")
        userEvent.type(repeatPasswordElement, "aaaa")
        userEvent.tab()

        await waitFor(() => {
          expect(repeatPasswordElement).toBeInvalid()
          const errorTextElement = getByText(repeatPasswordErrorText)
          expect(errorTextElement).toBeInTheDocument()
        })
      })
      test("the repeatPassword validation passes with the same password", async () => {
        const passwordElement = queries.getByLabelText(passwordInputText)

        const password = "mockPassword"
        userEvent.type(passwordElement, password)
        userEvent.type(repeatPasswordElement, password)
        userEvent.tab()

        await waitFor(() => {
          expect(repeatPasswordElement).toBeValid()
        })
      })
    })

    describe("login page link", () => {
      let loginPageLinkElement: HTMLElement

      beforeEach(() => {
        loginPageLinkElement = getByText("Inicia sesión")
      })

      it("should have a link to go to the login page", () => {
        expect(loginPageLinkElement).toBeInTheDocument()
      })
      test("the link should redirect to the login page", () => {
        userEvent.click(loginPageLinkElement)

        expect(mockPush).toHaveBeenCalledWith("/login")
      })
    })
  })

  describe("submit button", () => {
    let submitButtonElement: HTMLElement
    beforeEach(() => {
      submitButtonElement = queries.getByRole("button", {
        name: submitButtonText,
      })
    })

    it("should have a submit button", () => {
      expect(submitButtonElement).toBeInTheDocument()
    })
    it("should dispatch an action to save in the store the form values", async () => {
      const emailElement = queries.getByLabelText(emailInputText)
      const passwordElement = queries.getByLabelText(passwordInputText)
      const repeatPasswordElement = queries.getByLabelText(
        repeatPasswordInputText
      )
      const email = "aaaa@aaa.aa"
      const pwd = "aaaaa"

      userEvent.type(emailElement, email)
      userEvent.type(passwordElement, pwd)
      userEvent.type(repeatPasswordElement, pwd)
      userEvent.click(submitButtonElement)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled()
      })
    })
  })
})
