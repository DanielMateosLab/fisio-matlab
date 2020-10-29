import React from "react"
import { render } from "@testing-library/react"
import WelcomePage, { principles } from "./WelcomePage"
import userEvent from "@testing-library/user-event"
import Router from "next/router"

jest.mock("next/router")

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
    const loginButtonElement = getByText("Inicia sesión")

    expect(loginButtonElement).toBeInTheDocument()
  })
  it("redirects to the login page when clicking it", () => {
    const routerSpy = jest.spyOn(Router, "push")
    const { getByText } = render(<WelcomePage />)
    const loginButtonElement = getByText("Inicia sesión")

    userEvent.click(loginButtonElement)

    expect(routerSpy).toHaveBeenCalledWith("/login")
  })
})

describe("Signup button", () => {
  it("should render a signup button", () => {
    const { getByText } = render(<WelcomePage />)
    const signupButtonElement = getByText("Regístrate")

    expect(signupButtonElement).toBeInTheDocument()
  })
  it.todo("should redirect to the signup page")
})
