import { render } from "@testing-library/react"
import appName from "../../appShared/appName"
import Header, { appDescription } from "./Header"

it("should show the app name and description", () => {
  const { getByText } = render(<Header />)

  const appNameElement = getByText(appName)
  const appDescriptionElement = getByText(appDescription)

  expect(appNameElement).toBeInTheDocument()
  expect(appDescriptionElement).toBeInTheDocument()
})
