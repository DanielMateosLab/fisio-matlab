import { render } from "./testUtils"
import appName from "../../appShared/appName"
import Header, { appDescription, HeaderWithCustomScreenSize } from "./Header"
import userEvent from "@testing-library/user-event"
import { RenderResult } from "@testing-library/react"

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/",
      push: mockPush,
    }
  },
}))

const mockPush = jest.fn()

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
    jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
      pathname: "/login",
      push: mockPush,
    }))

    const { getByText } = render(<Header />)
    const appNameElement = getByText(appName)

    userEvent.click(appNameElement)

    expect(mockPush).toHaveBeenCalledWith("/")
    expect(appNameElement).toHaveStyle("cursor: pointer")
  })

  describe("Auhtenticated state", () => {
    const email = "aaaa@aaa.aaa"

    describe("Big screen sizes", () => {
      let queries: RenderResult

      beforeEach(() => {
        queries = render(<Header />, {
          initialState: { session: { email } },
        })
      })

      it("should have a logout button when there is an auth user", () => {
        const logoutButtonElement = queries.getByRole("button", {
          name: "Cerrar sesión",
        })

        expect(logoutButtonElement).toBeInTheDocument()
      })
      it("should show the user email when it is authenticated", () => {
        const emailElement = queries.getByText(email)

        expect(emailElement).toBeInTheDocument()
      })
    })

    describe("Small screen sizes", () => {
      let queries: RenderResult

      beforeEach(() => {
        queries = render(<HeaderWithCustomScreenSize smallScreen={true} />, {
          initialState: { session: { email } },
        })
      })

      it("initially should not have a logout button", () => {
        const logoutButtonElement = queries.queryByRole("button", {
          name: "Cerrar sesión",
        })

        expect(logoutButtonElement).not.toBeInTheDocument()
      })
      it("should have a menu button", () => {
        const menuButtonElement = queries.getByRole("button", { name: "menu" })

        expect(menuButtonElement).toBeInTheDocument()
      })
      it("should display the user email after clicking the menu button", () => {
        const menuButtonElement = queries.getByRole("button", { name: "menu" })

        userEvent.click(menuButtonElement)

        const emailElement = queries.getByText(email)

        expect(emailElement).toBeInTheDocument()

        //TODO: add drawer https://material-ui.com/components/drawers/#drawer
      })
    })
  })
})
