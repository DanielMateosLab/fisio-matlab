import { waitFor } from "@testing-library/react"
import { LogoutResponse } from "appShared/types"
import Cookies from "js-cookie"
import { initialState, mockThunkAPI } from "../clientShared/testUtils"
import sessionReducer, {
  authenticate,
  authFulfilled,
  changePassword,
  deleteAccount,
  deleteAccountPayloadCreator,
  logout,
  pendingLogoutCookieName,
  sessionCookieName,
  sessionExpiration,
} from "./sessionSlice"

jest.mock("js-cookie")

const emptyInitialState = sessionReducer(undefined, { type: "" })
const email = "aaaa"
const mockDispatch = jest.fn()

describe("authenticate", () => {
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
  const successfulResponse = JSON.stringify({ status: "success" })
  fetchMock.mockResponse(successfulResponse)

  const exec = () => {
    logout()(mockDispatch, () => initialState, undefined)
  }

  it("should call Cookies.remove(sessionCookieName)", async () => {
    exec()

    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith(sessionCookieName)
    })
  })
  it("should send a DEL request to /api/login", async () => {
    exec()

    await waitFor(() => {
      const path = fetchMock.mock.calls[0][0]
      const method = fetchMock.mock.calls[0][1]?.method
      expect(path).toEqual("/api/login")
      expect(method).toEqual("DEL")
    })
  })
  // TODO: this cookie must be parsed on page load to call logout api endpoint
  it("should set pending_logout cookie if api response is not successful", async () => {
    const errorResponse: LogoutResponse = {
      status: "error",
      message: "error",
      name: "MockError",
    }
    fetchMock.once(JSON.stringify(errorResponse))

    exec()

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith(pendingLogoutCookieName, "1")
    })
  })
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
