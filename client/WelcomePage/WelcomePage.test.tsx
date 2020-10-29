import React from "react"
import { render, RenderResult } from "@testing-library/react"
import WelcomePage, { principles } from "./WelcomePage"
import userEvent from "@testing-library/user-event"
import Router from "next/router"

jest.mock("next/router")

describe("WelcomePage", () => {
  let queries: RenderResult
  let getByText

  beforeEach(() => {
    queries = render(<WelcomePage />)
    getByText = queries.getByText
  })

  it("should show the principle names and descriptions", () => {
    principles.forEach((principle) => {
      const principleNameElement = getByText(principle.name)
      const principleDescriptionElement = getByText(principle.description)

      expect(principleNameElement).toBeInTheDocument()
      expect(principleDescriptionElement).toBeInTheDocument()
    })
  })

  describe("Login button", () => {
    let loginButtonElement
    beforeEach(() => {
      loginButtonElement = getByText("Inicia sesión")
    })
    afterEach(() => {
      loginButtonElement = undefined
    })

    it("should render a log in button", () => {
      expect(loginButtonElement).toBeInTheDocument()
    })
    it("redirects to the login page when clicking it", () => {
      const routerSpy = jest.spyOn(Router, "push")

      userEvent.click(loginButtonElement)

      expect(routerSpy).toHaveBeenCalledWith("/login")
    })
  })

  describe("Signup button", () => {
    it("should render a signup button", () => {
      const signupButtonElement = getByText("Regístrate")

      expect(signupButtonElement).toBeInTheDocument()
    })
    it.todo("should redirect to the signup page")
    // TODO: make something to go back to the home page from the auth pages
  })
})
