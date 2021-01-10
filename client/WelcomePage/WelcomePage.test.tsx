import React from "react"
import {
  mockPush,
  render,
  renderAuthenticated,
} from "../clientShared/testUtils"
import WelcomePage, {
  authButtonText,
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

  describe("Auth button", () => {
    it("should render an auth button", () => {
      const { getByText } = render(<WelcomePage />)

      const authButtonElement = getByText(authButtonText)

      expect(authButtonElement).toBeInTheDocument()
    })
    it("call auth0 login()", () => {
      const { getByText } = render(<WelcomePage />)

      const authButtonElement = getByText(authButtonText)
      userEvent.click(authButtonElement)

      expect(mockPush.mock.calls[0]).toContain("/login")
    })
    it("should not be present if there is an active session", () => {
      const { queryByText } = renderAuthenticated(<WelcomePage />)

      const authButtonElement = queryByText(authButtonText)

      expect(authButtonElement).not.toBeInTheDocument()
    })
  })

  test("Auth button should not be present if there is an active session", () => {
    const { queryByText } = renderAuthenticated(<WelcomePage />)

    const authButtonElement = queryByText(authButtonText)

    expect(authButtonElement).not.toBeInTheDocument()
  })
})
