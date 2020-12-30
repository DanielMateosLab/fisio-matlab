import { waitFor } from "@testing-library/react"
import sessionReducer, {
  changePassword,
  deleteAccount,
  login,
  logoutSuccess,
  signup,
} from "./sessionSlice"

const emptyInitialState = sessionReducer(undefined, { type: "" })
const email = "aaaa"

describe("loginReducer", () => {
  test("login/pending action should set session.changedPassword to false if it's true", () => {
    const state = sessionReducer(
      { ...emptyInitialState, changedPassword: true },
      login.pending("", {} as any)
    )

    expect(state.changedPassword).toEqual(false)
  })
  test("login/fulfilled should update the state email", () => {
    const state = sessionReducer(
      undefined,
      login.fulfilled({ email }, "", {} as any)
    )

    expect(state.email).toEqual(email)
  })
  test("login/rejected should update state loginError", () => {
    const message = "aaaa"
    const state = sessionReducer(
      undefined,
      login.rejected({ message, name: "mockError" }, "", {} as any)
    )
    expect(state.loginError).toEqual(message)
  })
})
describe("signupReducer", () => {
  test("signup/fulfilled should update the state email", () => {
    const state = sessionReducer(
      undefined,
      signup.fulfilled({ email }, "", {} as any)
    )

    expect(state.email).toEqual(email)
  })
  test("signup/rejected should update state signupError", () => {
    const message = "aaaa"
    const state = sessionReducer(
      undefined,
      signup.rejected({ message, name: "mockError" }, "", {} as any)
    )
    expect(state.signupError).toEqual(message)
  })
  // This means that the action has field errors, updated in the form component
  test("signup/rejected should NOT update state signupError when there is an action payload", () => {
    const message = "aaaa"
    const state = sessionReducer(
      undefined,
      signup.rejected({ message, name: "mockError" }, "", {} as any, {
        password: message,
      })
    )
    expect(state.signupError).not.toEqual(message)
  })
})
describe("logoutSuccess", () => {
  it("should handle logoutSuccess and clean the state email", () => {
    const state = sessionReducer(
      { ...emptyInitialState, email },
      logoutSuccess()
    )

    expect(state.email).toEqual("")
  })
})
describe("changePassword", () => {
  const currentPassword = "aaaaa"
  const password = "bbbbb"
  test("changePassword.fullfilled action should turn state.changedPassword to true", () => {
    const state = sessionReducer(
      undefined,
      changePassword.fulfilled(undefined, "", {} as any)
    )

    expect(state.changedPassword).toEqual(true)
  })
  it("should call logoutSuccess and changePasswordSuccess", async () => {
    const mockDispatch = jest.fn()
    changePassword({ password, currentPassword })(
      mockDispatch as any,
      () => ({} as any),
      null
    )

    await waitFor(() => {
      // First, the pending action is called, then logoutSuccess and finally fulfilled
      expect(mockDispatch.mock.calls[2][0].type).toEqual(
        changePassword.fulfilled(undefined, "", {} as any).type
      )
      expect(mockDispatch).toHaveBeenCalledWith(logoutSuccess())
    })
  })
})
describe("deleteAccount", () => {
  it("should call logoutSuccess", () => {
    const password = "aaaaa"
    const mockDispatch = jest.fn()
    deleteAccount(password)(mockDispatch as any, () => ({} as any), null)

    expect(mockDispatch).toHaveBeenCalledWith(logoutSuccess())
  })
})
