import userEvent from "@testing-library/user-event"
import {
  mockPush,
  render,
  renderAuthenticated,
  RenderResult,
  waitFor,
} from "../clientShared/testUtils"
import { changePasswordValidationSchema } from "../clientShared/Validation"
import Profile, {
  currentPasswordInputText,
  newPasswordInputText,
  repeatNewPasswordInputText,
  submitButtonText,
} from "./Profile"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))

describe("Me", () => {
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
      expect.hasAssertions()
      const validationSpy = jest.spyOn(
        changePasswordValidationSchema,
        "validate"
      )

      const currentPwdElement = queries.getByLabelText(currentPasswordInputText)
      userEvent.type(currentPwdElement, "aaaa")

      await waitFor(() => {
        expect(validationSpy).toHaveBeenCalled()
      })
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
        expect(mockDispatch).toHaveBeenCalled()
      })
    })
  })

  it.todo("should have a logout button")

  it.todo("should have a delete account button")
  it.todo("the delete account button should trigger the delete account dialog")
})
