import { waitFor } from "@testing-library/react"
import Cookies from "js-cookie"
import { initialState, mockThunkAPI } from "../clientShared/testUtils"
import sessionReducer, {
  authenticate,
  authFulfilled,
  changePassword,
  deleteAccount,
  deleteAccountPayloadCreator,
  login,
  loginPayloadCreator,
  logout,
  logoutPayloadCreator,
  sessionCookieName,
  sessionExpiration,
} from "./sessionSlice"

jest.mock("js-cookie")

const emptyInitialState = sessionReducer(undefined, { type: "" })
const email = "aaaa"

describe("authenticate", () => {
  const mockDispatch = jest.fn()
  const email = "mockEmail@mo.ck"
  it("should set a cookie indicating that the session is active", () => {
    const spy = jest.spyOn(Cookies, "set")
    authenticate(email)(mockDispatch, () => initialState, undefined)

    expect(spy).toHaveBeenCalledWith(sessionCookieName, "true", {
      expires: sessionExpiration,
    })
  })
  it.todo("should dispatch authFulfilled with the email")
})

describe("authenticationFulfilled", () => {
  it("should update the state email", () => {
    const state = sessionReducer(undefined, authFulfilled({ email }))
    expect(state.email).toEqual(email)
  })
})
describe("loginReducer", () => {
  test("login/pending action should set session.changedPassword to false if it's true", () => {
    const state = sessionReducer(
      { ...emptyInitialState, changedPassword: true },
      login.pending("", {} as any)
    )

    expect(state.changedPassword).toEqual(false)
  })
  test("login/pending action should clean loginError", () => {
    const state = sessionReducer(
      { ...emptyInitialState, loginError: "aaaaaa" },
      login.pending("", {} as any)
    )

    expect(state.loginError).toEqual("")
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
  test("login should call Cookies.set() with the email with valid input", async () => {
    expect.hasAssertions()
    const email = "daniel.mat.lab@usal.es"
    const password = "bbbbb"
    await loginPayloadCreator({ email, password }, {} as any)

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith(sessionCookieName, email, {
        expires: sessionExpiration,
      })
    })
  })
})
describe("logout", () => {
  test("logout should call Cookies.remove() with a 200 api response", async () => {
    expect.hasAssertions()
    await logoutPayloadCreator(undefined, mockThunkAPI as any)

    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith(sessionCookieName)
    })
  })
  test("dispatching logout.fulfilled should clean the state email", () => {
    const state = sessionReducer(
      { ...emptyInitialState, email },
      logout.fulfilled(undefined, "", undefined)
    )

    expect(state.email).toEqual("")
  })
  // We do this because we should be able to close the session offline
  // TODO: later, see in passport how to make this possible (to not use the server session if the client one is not available)
  // Possible solution: set a cookie with { pendingLogout: true } and write a middleware to check the flag and call logout
  test("dispatching logout.pending should clean the state email", () => {
    const state = sessionReducer(
      { ...emptyInitialState, email },
      logout.fulfilled(undefined, "", undefined)
    )

    expect(state.email).toEqual("")
  })
})
describe("changePassword", () => {
  test("changePassword.fullfilled action should turn state.changedPassword to true", () => {
    const state = sessionReducer(
      undefined,
      changePassword.fulfilled(undefined, "", {} as any)
    )

    expect(state.changedPassword).toEqual(true)
  })
})
describe("deleteAccount", () => {
  test("deleteAccount.fulfilled action dispatch should clean session.email", () => {
    const password = "aaaaa"
    const state = sessionReducer(
      { ...emptyInitialState, email },
      deleteAccount.fulfilled(undefined, "", { password })
    )

    expect(state.email).toEqual("")
  })
  test("deleteAccount should call Cookies.remove() with a 200 api response", async () => {
    const password = "aaaaa"
    expect.hasAssertions()
    await deleteAccountPayloadCreator({ password }, mockThunkAPI as any)

    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith(sessionCookieName)
    })
  })
})
