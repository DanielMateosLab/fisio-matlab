import userEvent from "@testing-library/user-event"
import {
  initialState,
  mockPush,
  render,
  renderAuthenticated,
  RenderResult,
  sessionInitialState,
  waitFor,
} from "../clientShared/testUtils"
import {
  changePasswordValidationSchema,
  deleteAccountValidationSchema,
} from "../clientShared/Validation"
import Profile, {
  currentPasswordInputText,
  deleteAccountButtonText,
  deleteAccountDescription,
  deleteAccountPwdInputText,
  deleteAccountTitle,
  deleteAccountWarningText,
  newPasswordInputText,
  repeatNewPasswordInputText,
  submitButtonText,
} from "./Profile"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))

describe("Profile", () => {
  // Without session
  it("should redirect to the login page if there is no session", () => {
    render(<Profile />)

    expect(mockPush).toHaveBeenCalledWith("/login")
  })

  // With session
  const email = "aaaa@aaa.aa"

  it("should show the user email", () => {
    const { getByText } = renderAuthenticated(<Profile />, email)
    const emailElement = getByText(email)

    expect(emailElement).toBeInTheDocument()
  })

  describe("it should have a change-password form", () => {
    let queries: RenderResult
    beforeEach(() => {
      queries = renderAuthenticated(<Profile />, email)
    })
    it('should have a "current password" field', () => {
      const currentPwdElement = queries.getByLabelText(currentPasswordInputText)

      expect(currentPwdElement).toBeInTheDocument()
    })
    it('should have a "new password" field', () => {
      const newPwdElement = queries.getByLabelText(newPasswordInputText)

      expect(newPwdElement).toBeInTheDocument()
    })
    it('should have a "repeat new password" field', () => {
      const repeatPwdElement = queries.getByLabelText(
        repeatNewPasswordInputText
      )

      expect(repeatPwdElement).toBeInTheDocument()
    })
    test("writing in the form should trigger validation", async () => {
      try {
        const validationSpy = jest.spyOn(
          changePasswordValidationSchema,
          "validate"
        )

        const currentPwdElement = queries.getByLabelText(
          currentPasswordInputText
        )
        userEvent.type(currentPwdElement, "aaaa")

        await waitFor(() => {
          expect(validationSpy).toHaveBeenCalled()
        })
      } catch (e) {
        expect(e).toBeUndefined()
      }
    })
    it("should show the changePasswordError when there is one", () => {
      const mockError = "aaaaa"
      const { getByText } = render(<Profile />, {
        initialState: {
          ...initialState,
          session: { ...sessionInitialState, changePasswordError: mockError },
        },
      })

      const errorElement = getByText(mockError)

      expect(errorElement).toBeInTheDocument()
    })
    it("should have a submit button", () => {
      const submitButtonElement = queries.getByRole("button", {
        name: submitButtonText,
      })

      expect(submitButtonElement).toBeInTheDocument()
    })
    test("submitting the form should dispatch changePassword thunk", async () => {
      expect.hasAssertions()
      jest
        .spyOn(changePasswordValidationSchema, "validate")
        .mockImplementation(async () => ({} as any))

      const submitButtonElement = queries.getByRole("button", {
        name: submitButtonText,
      })

      userEvent.click(submitButtonElement)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled() // Impossible to test with strict equality
      })
    })
  })
  describe("delete account section", () => {
    it("should have a title", () => {
      const { getByRole } = renderAuthenticated(<Profile />, email)

      const titleElement = getByRole("heading", { name: deleteAccountTitle })
      expect(titleElement).toBeInTheDocument()
    })
    it("should have a description", () => {
      const { getByText } = renderAuthenticated(<Profile />, email)

      const descriptionElement = getByText(deleteAccountDescription)

      expect(descriptionElement).toBeInTheDocument()
    })
    it("should have a warning", () => {
      const { getByText } = renderAuthenticated(<Profile />, email)

      const warningElement = getByText(deleteAccountWarningText)

      expect(warningElement).toBeInTheDocument()
    })
    it("should have a password input", () => {
      const { getByLabelText } = renderAuthenticated(<Profile />, email)

      const passwordInputElemenet = getByLabelText(deleteAccountPwdInputText)

      expect(passwordInputElemenet).toBeInTheDocument()
    })
    it("should show the changePasswordError when there is one", () => {
      const mockError = "aaaaa"
      const { getByText } = render(<Profile />, {
        initialState: {
          ...initialState,
          session: {
            ...sessionInitialState,
            deleteAccountError: mockError,
          },
        },
      })

      const errorElement = getByText(mockError)

      expect(errorElement).toBeInTheDocument()
    })

    it("should have a submit button", async () => {
      const { getByRole } = renderAuthenticated(<Profile />, email)

      const buttonElement = getByRole("button", {
        name: deleteAccountButtonText,
      })

      expect(buttonElement).toBeInTheDocument()
    })
    test("clicking the submit button calls dispatch(deleteAccount(password))", async () => {
      expect.hasAssertions()
      const password = "aaaaa"
      jest
        .spyOn(deleteAccountValidationSchema, "validate")
        .mockImplementation(async () => ({ password }))

      const { getByRole } = renderAuthenticated(<Profile />, email)

      const buttonElement = getByRole("button", {
        name: deleteAccountButtonText,
      })
      userEvent.click(buttonElement)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled()
      })
    })
  })
})
