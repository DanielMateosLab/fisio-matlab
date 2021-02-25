import { UsersGetResponse } from "appShared/types"
import { render, waitFor } from "client/clientShared/testUtils"
import Cookies from "js-cookie"
import ParseSessionOnLoad from "./ParseSessionOnLoad"

jest.mock("js-cookie")

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))
const mockDispatch = jest.fn()

describe("ParseSessionOnLoad", () => {
  const email = "aaaa@aaa.aa"
  describe("if there is a session active", () => {
    //@ts-ignore
    Cookies.get.mockImplementation(() => "1" as any)
    it("should try to get the user with a request to /api/users/me", () => {
      // Mock response to avoid errors
      fetchMock.once(JSON.stringify({}))

      render(<ParseSessionOnLoad />)

      expect(fetchMock).toHaveBeenCalledWith("/api/users/me")
    })
    it("should dispatch an authenticate action if we get an user", async () => {
      fetchMock.once(
        JSON.stringify({
          status: "success",
          user: { email },
        } as UsersGetResponse)
      )

      render(<ParseSessionOnLoad />)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled()
      })
    })
    it.todo("should dispatch a logout action if there is no user")
  })
  // This might be posible if the user has tried to log out but there was a network error
  it.todo(
    "should send a logout request to the server if there is a pending logout"
  )
  it.todo("should do nothing if there are no session related cookies")
})
