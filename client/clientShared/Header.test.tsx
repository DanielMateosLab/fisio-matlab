import { mockPush, render } from "./testUtils"
import { appName, appDescription } from "../../appShared/appData"
import Header from "./Header"
import userEvent from "@testing-library/user-event"

describe("Header", () => {
  it("should show the app name and description", () => {
    const { getByText } = render(<Header />)

    const appNameElement = getByText(appName)
    const appDescriptionElement = getByText(appDescription)

    expect(appNameElement).toBeInTheDocument()
    expect(appDescriptionElement).toBeInTheDocument()
  })

  test("the page title should not be a link if we are in the home page", () => {
    const { getByText } = render(<Header />)
    const appNameElement = getByText(appName)

    userEvent.click(appNameElement)

    expect(mockPush).not.toHaveBeenCalled()
    expect(appNameElement).not.toHaveStyle("cursor: pointer")
  })

  test("the page title should be a link to go back to the home page if we are not in there", () => {
    const { getByText } = render(<Header />, { pathname: "/login" })
    const appNameElement = getByText(appName)

    userEvent.click(appNameElement)

    expect(mockPush).toHaveBeenCalledWith("/")
    expect(appNameElement).toHaveStyle("cursor: pointer")
  })

  it("should have a menu", () => {
    const { getByRole } = render(<Header />)

    const menuElement = getByRole("menu")

    expect(menuElement).toBeDefined()
  })
})
