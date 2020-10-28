import { render } from "@testing-library/react"
import Login, { loginTitle } from "./Login"

it("should render the login page title", () => {
  const { getByText } = render(<Login />)
  const titleElement = getByText(loginTitle)

  expect(titleElement).toBeInTheDocument()
})
