import sessionReducer, {
  authSuccess,
  changePassword,
  changePasswordSuccess,
  logoutSuccess,
} from "./sessionSlice"

const emptyInitialState = sessionReducer(undefined, { type: "" })
const email = "aaaa"

describe("authSuccess reducer", () => {
  it("should update the state email", () => {
    const state = sessionReducer(undefined, authSuccess({ email }))

    expect(state.email).toEqual(email)
  })
  it("should set session.changedPassword to false if it's true", () => {
    const state = sessionReducer(
      { ...emptyInitialState, changedPassword: true },
      authSuccess({ email })
    )

    expect(state.changedPassword).toEqual(false)
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
  test("the changePasswordSuccess action should turn state.changedPassword to true", () => {
    const state = sessionReducer(undefined, changePasswordSuccess())

    expect(state.changedPassword).toEqual(true)
  })
  it("should call logoutSuccess and changePasswordSuccess", () => {
    const mockDispatch = jest.fn()
    changePassword()(mockDispatch as any, () => ({} as any), null)

    expect(mockDispatch).toHaveBeenCalledWith(changePasswordSuccess())
    expect(mockDispatch).toHaveBeenCalledWith(logoutSuccess())
  })
})
