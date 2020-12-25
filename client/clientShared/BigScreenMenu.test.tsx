import userEvent from "@testing-library/user-event"
import { logoutSuccess } from "../session/sessionSlice"
import BigScreenMenu from "./BigScreenMenu"
import { logoutButtonText } from "./Header"
import { render, renderAuthenticated } from "./testUtils"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))

const mockPush = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe("Big Screens' Menu", () => {
  const email = "aaaa@aaa.aa"

  const renderUnauth = () => render(<BigScreenMenu />)
  const renderAuth = () => renderAuthenticated(<BigScreenMenu />, email)

  describe("user email", () => {
    it("should show the user email when someone is authenticated", () => {
      const { getByText } = renderAuth()
      const emailElement = getByText(email)

      expect(emailElement).toBeInTheDocument()
    })
    it("should be a link to the profile page", () => {
      const { getByText } = renderAuth()
      const emailElement = getByText(email)

      userEvent.click(emailElement)

      expect(mockPush).toHaveBeenCalledWith("/profile")
    })
  })

  describe("logout button", () => {
    it("should have a logout button when someone is authenticated", () => {
      const { getByRole } = renderAuth()
      const logoutButtonElement = getByRole("button", {
        name: logoutButtonText,
      })

      expect(logoutButtonElement).toBeInTheDocument()
    })
    it("should NOT have a logout button when none is authenticated", () => {
      const { queryByRole } = renderUnauth()
      const logoutButtonElement = queryByRole("button", {
        name: logoutButtonText,
      })

      expect(logoutButtonElement).not.toBeInTheDocument()
    })
    test("the logout button should dispatch a logoutSucess action", () => {
      const { getByRole } = renderAuth()
      const logoutButtonElement = getByRole("button", {
        name: logoutButtonText,
      })

      userEvent.click(logoutButtonElement)

      expect(mockDispatch).toHaveBeenCalledWith(logoutSuccess())
    })
  })
})
