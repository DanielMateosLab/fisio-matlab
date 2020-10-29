import { render } from "@testing-library/react"
import Signup, { signupComponentTitle } from "./Signup"

describe("Signup", () => {
  it("should render the signup component title", () => {
    const { getByText } = render(<Signup />)

    const titleElement = getByText(signupComponentTitle)

    expect(titleElement).toBeInTheDocument()
  })
})
