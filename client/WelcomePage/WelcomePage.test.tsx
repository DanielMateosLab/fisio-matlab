import React from "react"
import { render } from "@testing-library/react"
import WelcomePage, { principles } from "./WelcomePage"
import { loginTitle } from "../Auth/LoginPage"

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
  it("should display the Login component", () => {
    const { getByText } = render(<WelcomePage />)
    const loginTitleElement = getByText(loginTitle)

    expect(loginTitleElement).toBeInTheDocument()
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
