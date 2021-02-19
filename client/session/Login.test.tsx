import userEvent from "@testing-library/user-event"
import {
  initialState,
  mockPush,
  render,
  renderAuthenticated,
  sessionInitialState,
  waitFor,
} from "../clientShared/testUtils"
import Login, {
  changedPasswordText,
  emailInputText,
  loginFormError,
  loginTitle,
  passwordInputText,
  submitButtonText,
} from "./Login"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))

describe("Login", () => {
  const submitForm = () => {
    const queries = render(<Login />)
    const { getByLabelText, getByRole } = queries

    const emailElement = getByLabelText(emailInputText)
    const passwordElement = getByLabelText(passwordInputText)
    const submitButtonElement = getByRole("button", {
      name: submitButtonText,
    })

    const email = "aaaa@aaa.aa"
    const password = "aaaaa"

    userEvent.type(emailElement, email)
    userEvent.type(passwordElement, password)
    userEvent.click(submitButtonElement)

    return queries
  }
  it("should render the login page title", () => {
    const { getByText } = render(<Login />)

    const titleElement = getByText(loginTitle)

    expect(titleElement).toBeInTheDocument()
  })

  it("should have an email input", () => {
    const { getByLabelText } = render(<Login />)

    const emailInputElement = getByLabelText(emailInputText)

    expect(emailInputElement).toBeInTheDocument()
  })
  it("should have a password input", () => {
    const { getByLabelText } = render(<Login />)

    const passwordInputElement = getByLabelText(passwordInputText)

    expect(passwordInputElement).toBeInTheDocument()
  })
  it("should have a submit button", () => {
    const { getByRole } = render(<Login />)

    const submitButtonElement = getByRole("button", {
      name: submitButtonText,
    })

    expect(submitButtonElement).toBeInTheDocument()
  })
  test("writing in the form should trigger validation", async () => {
    const { getByLabelText } = render(<Login />)

    const emailInputElement = getByLabelText(emailInputText)

    userEvent.type(emailInputElement, "aaaa")
    userEvent.tab()

    await waitFor(() => {
      expect(emailInputElement).toBeInvalid()
    })
  })
  it("submitting the form should call handleAuthResponse", async () => {
    const spy = jest.spyOn(
      require("client/session/handleAuthResponse"),
      "default"
    )

    submitForm()

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
  it("should show a success text message when state.session.changePassword is true", () => {
    const { getByText } = render(<Login />, {
      initialState: {
        ...initialState,
        session: { ...sessionInitialState, changedPassword: true },
      },
    })

    const changedPasswordTextElement = getByText(changedPasswordText)

    expect(changedPasswordTextElement).toBeInTheDocument()
  })
  it("should show the default error message when there is an unknown or server error", async () => {
    const formErrorApiRes = JSON.stringify({
      status: "error",
      message: "mockError",
    })
    fetchMock.once(formErrorApiRes)
    const queries = submitForm()

    await waitFor(() => {
      const errorElement = queries.getByText(loginFormError)
      expect(errorElement).toBeInTheDocument()
    })
  })
  describe("signup page link", () => {
    let signupPageLinkElement: HTMLElement

    beforeEach(() => {
      const { getByText } = render(<Login />)

      signupPageLinkElement = getByText("Regístrate")
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

it("should redirect to the profile page when there is a session", () => {
  renderAuthenticated(<Login />)

  expect(mockPush).toHaveBeenCalledWith("/profile")
})
