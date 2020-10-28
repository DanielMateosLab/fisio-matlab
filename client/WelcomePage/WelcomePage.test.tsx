import React from "react"
import { render } from "@testing-library/react"
import WelcomePage, { principles, appDescription } from "./WelcomePage"
import appName from "../../shared/appName"

it("should show the app name and description", () => {
  const { getByText } = render(<WelcomePage />)

  const appNameElement = getByText(appName)
  const appDescriptionElement = getByText(appDescription)

  expect(appNameElement).toBeInTheDocument()
  expect(appDescriptionElement).toBeInTheDocument()
})

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
  it.todo("should display the Login component")
})

describe("Signup button", () => {
  it("should render a signup button", () => {
    const { getByText } = render(<WelcomePage />)
    const signupButtonElement = getByText("Regístrate")

    expect(signupButtonElement).toBeInTheDocument()
  })
  it.todo("should redirect to the signup page")
})
