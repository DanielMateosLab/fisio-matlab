import userEvent from "@testing-library/user-event"
import { logoutSuccess } from "../session/sessionSlice"
import { logoutButtonText } from "./Header"
import Sidebar from "./Sidebar"
import { mockPush, render, renderAuthenticated } from "./testUtils"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))

describe("Sidebar", () => {
  const email = "aaaa@aaa.aa"

  const sidebarElement = <Sidebar sidebarOpened setSidebarOpened={() => {}} />
  const renderUnauth = () => render(sidebarElement)
  const renderAuth = () => renderAuthenticated(sidebarElement, email)

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
    it("should not show the user email when none is authenticated", () => {
      const { queryByText } = renderUnauth()
      const emailElement = queryByText(email)

      expect(emailElement).not.toBeInTheDocument()
    })
  })

  describe("Logout Button", () => {
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
