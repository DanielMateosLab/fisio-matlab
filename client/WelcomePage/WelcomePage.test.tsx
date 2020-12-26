import React from "react"
import {
  mockPush,
  render,
  renderAuthenticated,
} from "../clientShared/testUtils"
import WelcomePage, {
  loginButtonText,
  principles,
  signupButtonText,
} from "./WelcomePage"
import userEvent from "@testing-library/user-event"

describe("WelcomePage", () => {
  it("should show the principle names and descriptions", () => {
    const { getByText } = render(<WelcomePage />)

    principles.forEach((principle) => {
      const principleNameElement = getByText(principle.name)
      const principleDescriptionElement = getByText(principle.description)

      expect(principleNameElement).toBeInTheDocument()
      expect(principleDescriptionElement).toBeInTheDocument()
    })
  })

  describe("Login button", () => {
    it("should render a log in button", () => {
      const { getByText } = render(<WelcomePage />)

      const loginButtonElement = getByText(loginButtonText)

      expect(loginButtonElement).toBeInTheDocument()
    })
    it("redirects to the login page when clicking it", () => {
      const { getByText } = render(<WelcomePage />)

      const loginButtonElement = getByText(loginButtonText)
      userEvent.click(loginButtonElement)

      expect(mockPush.mock.calls[0]).toContain("/login")
    })
    it("should not be present if there is an active session", () => {
      const { queryByText } = renderAuthenticated(<WelcomePage />)

      const loginButtonElement = queryByText(loginButtonText)

      expect(loginButtonElement).not.toBeInTheDocument()
    })
  })

  describe("Signup button", () => {
    it("should render a signup button", () => {
      const { getByText } = render(<WelcomePage />)

      const signupButtonElement = getByText(signupButtonText)

      expect(signupButtonElement).toBeInTheDocument()
    })
    it("should redirect to the signup page", () => {
      const { getByText } = render(<WelcomePage />)

      const signupButtonElement = getByText(signupButtonText)
      userEvent.click(signupButtonElement)

      expect(mockPush.mock.calls[0]).toContain("/signup")
    })
    it("should not be present if there is an active session", () => {
      const { queryByText } = renderAuthenticated(<WelcomePage />)

      const signupButtonElement = queryByText(signupButtonText)

      expect(signupButtonElement).not.toBeInTheDocument()
    })
  })

  test("Login and Signup buttons should not be present if there is an active session", () => {
    const { queryByText } = renderAuthenticated(<WelcomePage />)

    const signupButtonElement = queryByText(signupButtonText)
    const loginButtonElement = queryByText(loginButtonText)

    expect(signupButtonElement).not.toBeInTheDocument()
    expect(loginButtonElement).not.toBeInTheDocument()
  })
})
