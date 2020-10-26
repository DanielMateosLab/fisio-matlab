import React from "react"
import { render } from "@testing-library/react"
import WelcomePage, { principles, appName, appDescription } from "./WelcomePage"

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
  it.todo("should render a log in button")
  it.todo("should display the Login component")
})

describe("Register button", () => {
  it.todo("should render a register button")
  it.todo("should redirect to the register page")
})
