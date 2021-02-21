import { waitFor } from "@testing-library/react"
import Cookies from "js-cookie"
import { initialState, mockThunkAPI } from "../clientShared/testUtils"
import sessionReducer, {
  authenticate,
  authFulfilled,
  changePassword,
  deleteAccount,
  deleteAccountPayloadCreator,
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
  it("should dispatch authFulfilled with the email", () => {
    authenticate(email)(mockDispatch, () => initialState, undefined)

    expect(mockDispatch).toHaveBeenCalledWith(authFulfilled({ email }))
  })
})

describe("authenticationFulfilled", () => {
  it("should update the state email", () => {
    const state = sessionReducer(undefined, authFulfilled({ email }))
    expect(state.email).toEqual(email)
  })
})

describe("logout", () => {
  it.todo("should call Cookies.remove()")
  it.todo("should send a DEL request to /api/login")
  // TODO: this cookie must be parsed on page load to call logout api endpoint
  it.todo(
    "should set ss_logout_pending cookie if api response is not successful"
  )
  test.todo("logoutFulfilled should clean the state email")
  it.todo("should dispatch logoutFulfilled")
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
