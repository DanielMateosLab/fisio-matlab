import { render, RenderResult, waitFor } from "@testing-library/react"
import Login, {
  loginTitle,
  emailInputText,
  passwordInputText,
  submitButtonText,
} from "./Login"
import userEvent from "@testing-library/user-event"
import { authSuccess } from "./sessionSlice"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))

const mockPush = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe("Login", () => {
  let queries: RenderResult
  let getByLabelText: typeof queries.getByLabelText

  beforeEach(() => {
    queries = render(<Login />)
    getByLabelText = queries.getByLabelText
  })

  it("should render the login page title", () => {
    const titleElement = queries.getByText(loginTitle)

    expect(titleElement).toBeInTheDocument()
  })
  it.todo("should redirect to the profile page when there is a session")

  it("should have an email input", () => {
    const emailInputElement = getByLabelText(emailInputText)

    expect(emailInputElement).toBeInTheDocument()
  })
  it("should have a password input", () => {
    const passwordInputElement = getByLabelText(passwordInputText)

    expect(passwordInputElement).toBeInTheDocument()
  })
  it("should have a submit button", () => {
    const submitButtonElement = queries.getByRole("button", {
      name: submitButtonText,
    })

    expect(submitButtonElement).toBeInTheDocument()
  })
  test("writing in the form should trigger validation", async () => {
    const emailInputElement = getByLabelText(emailInputText)

    userEvent.type(emailInputElement, "aaaa")
    userEvent.tab()

    await waitFor(() => {
      expect(emailInputElement).toBeInvalid()
    })
  })
  it("submitting the form should dispatch an action to save in the store the form values", async () => {
    const emailElement = queries.getByLabelText(emailInputText)
    const passwordElement = queries.getByLabelText(passwordInputText)
    const submitButtonElement = queries.getByRole("button", {
      name: submitButtonText,
    })

    const email = "aaaa@aaa.aa"
    const pwd = "aaaaa"

    userEvent.type(emailElement, email)
    userEvent.type(passwordElement, pwd)
    userEvent.click(submitButtonElement)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(authSuccess({ email }))
    })
  })
  describe("signup page link", () => {
    let signupPageLinkElement: HTMLElement

    beforeEach(() => {
      signupPageLinkElement = queries.getByText("Regístrate")
    })

    it("should have a link to go to the signup page", () => {
      expect(signupPageLinkElement).toBeInTheDocument()
    })
    test("the link should redirect to the signup page", () => {
      userEvent.click(signupPageLinkElement)

      expect(mockPush).toHaveBeenCalledWith("/signup")
    })
  })
})
