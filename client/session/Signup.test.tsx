import userEvent from "@testing-library/user-event"
import {
  emailErrorText,
  emailMaxCharacters,
  getMaxErrorText,
  getMinErrorText,
  passwordMaxCharacters,
  passwordMinCharacters,
  repeatPasswordErrorText,
  requiredErrorText,
} from "../../appShared/Validation"
import {
  mockPush,
  render,
  RenderResult,
  waitFor,
} from "../clientShared/testUtils"
import Signup, {
  emailInputText,
  passwordInputText,
  repeatPasswordInputText,
  signupComponentTitle,
  signupFormError,
  submitButtonText,
} from "./Signup"

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch() {
    return mockDispatch
  },
}))

const mockDispatch = jest.fn()

describe("Signup", () => {
  let queries: RenderResult
  let getByText: typeof queries.getByText

  const email = "aaaaa@aaaa.com"
  const password = "a".repeat(8)

  beforeEach(() => {
    queries = render(<Signup />)
    getByText = queries.getByText
  })

  describe("signup page title", () => {
    it("should render the signup component title", () => {
      const titleElement = getByText(signupComponentTitle)

      expect(titleElement).toBeInTheDocument()
    })
  })

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
        const errorText = queries.getByText(requiredErrorText)
        expect(errorText).toBeInTheDocument()
      })
    })
    test("the email validation should fail with a 257 characters email", async () => {
      userEvent.type(
        emailInputElement,
        // maxChars + 1 (to make the test fail) - 7 letters of the email domain part
        "a".repeat(emailMaxCharacters + 1 - 7) + "@aa.aaa"
      )
      userEvent.tab()

      await waitFor(() => {
        expect(emailInputElement).toBeInvalid()
        const errorText = getByText(getMaxErrorText(emailMaxCharacters))
        expect(errorText).toBeInTheDocument()
      })
    })
    test("the email validation should pass with a valid email", async () => {
      userEvent.type(emailInputElement, email)
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
        const errorText = getByText(requiredErrorText)
        expect(errorText).toBeInTheDocument()
      })
    })
    test("the password validation should fail with less characters than the minium length allowed", async () => {
      userEvent.type(
        passwordInputElement,
        "a".repeat(passwordMinCharacters - 1)
      )
      userEvent.tab()

      await waitFor(() => {
        expect(passwordInputElement).toBeInvalid()
        const errorText = getByText(getMinErrorText(passwordMinCharacters))
        expect(errorText).toBeInTheDocument()
      })
    })
    test("the password validation should fail with more characters than the maxium length allowed", async () => {
      userEvent.type(
        passwordInputElement,
        "a".repeat(passwordMaxCharacters + 1)
      )
      userEvent.tab()

      await waitFor(() => {
        expect(passwordInputElement).toBeInvalid()
        const errorText = getByText(getMaxErrorText(passwordMaxCharacters))
        expect(errorText).toBeInTheDocument()
      })
    })
    test("the password validation should pass with a valid password", async () => {
      userEvent.type(passwordInputElement, password)
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

      userEvent.type(passwordElement, password)
      userEvent.type(repeatPasswordElement, password)
      userEvent.tab()

      await waitFor(() => {
        expect(repeatPasswordElement).toBeValid()
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
  })

  describe("api responses", () => {
    const successfulApiRes = JSON.stringify({ status: "success" })
    const error = "mock error"
    const validationErrorApiRes = JSON.stringify({
      status: "error",
      payload: { email: error },
    })
    const formErrorApiRes = JSON.stringify({
      status: "error",
      message: error,
    })

    const submitForm = () => {
      const emailInputElement = queries.getByLabelText(emailInputText)
      userEvent.type(emailInputElement, email)

      const passwordInputElement = queries.getByLabelText(passwordInputText)
      userEvent.type(passwordInputElement, password)

      const repeatPasswordElement = queries.getByLabelText(
        repeatPasswordInputText
      )
      userEvent.type(repeatPasswordElement, password)

      const submitButtonElement = queries.getByRole("button", {
        name: submitButtonText,
      })
      userEvent.click(submitButtonElement)
    }
    describe("response succeeded", () => {
      it("should dispatch authenticate with the email", async () => {
        fetchMock.once(successfulApiRes)
        submitForm()

        await waitFor(() => {
          expect(mockDispatch).toHaveBeenCalled()
        })
      })
      it("should redirect to /profile", async () => {
        fetchMock.once(successfulApiRes)
        submitForm()

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith("/profile")
        })
      })
    })
    describe("response failed", () => {
      it("should set an email error if the response has a payload with an email property)", async () => {
        fetchMock.once(validationErrorApiRes)
        submitForm()

        await waitFor(() => {
          const errorElement = queries.getByText(error)
          expect(errorElement).toBeInTheDocument()
        })
      })
      it("should set a form error if the response has nor payload or email", async () => {
        fetchMock.once(formErrorApiRes)
        submitForm()

        await waitFor(() => {
          const errorElement = queries.getByText(signupFormError)
          expect(errorElement).toBeInTheDocument()
        })
      })
    })
    it("should enable the submit button when the submission handling is done", async () => {
      const submitButtonElement = queries.getByRole("button", {
        name: submitButtonText,
      })

      fetchMock.once(successfulApiRes)
      submitForm()
      await waitFor(() => {
        expect(submitButtonElement).toBeEnabled()
      })

      const error = "mock validation error"
      fetchMock.once(validationErrorApiRes)
      submitForm()
      await waitFor(() => {
        expect(submitButtonElement).toBeEnabled()
      })

      fetchMock.once(formErrorApiRes)
      submitForm()
      await waitFor(() => {
        expect(submitButtonElement).toBeEnabled()
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
