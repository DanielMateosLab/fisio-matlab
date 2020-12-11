import { render, RenderResult } from "@testing-library/react"
import Login, { loginTitle } from "./Login"

describe("Login", () => {
  let queries: RenderResult

  beforeEach(() => {
    queries = render(<Login />)
  })

  it("should render the login page title", () => {
    const { getByText } = queries
    const titleElement = getByText(loginTitle)

    expect(titleElement).toBeInTheDocument()
  })

  it.todo("should have an email input")
  it.todo("should have a password input")
  it.todo("should have a submit button")
})
