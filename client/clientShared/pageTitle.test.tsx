import { RenderResult } from "@testing-library/react"
import PageTitle from "./pageTitle"
import { render } from "./testUtils"

describe("PageTitle", () => {
  const text = "aaaa"
  let queries: RenderResult
  let getByText: RenderResult["getByText"]

  beforeEach(() => {
    queries = render(<PageTitle>{text}</PageTitle>)
    getByText = queries.getByText
  })

  it("should display the provided text", () => {
    const textElement = getByText(text)

    expect(textElement).toBeDefined()
  })

  it("should be an h2 html element", () => {
    const textElement = queries.getByText(text, { selector: "h2" })

    expect(textElement).toBeDefined()
  })

  it("should be centered", () => {
    const textElement = getByText(text)

    expect(textElement).toHaveStyle("text-align: center")
  })

  it("should have 1.25rem as fontSize", () => {
    const textElement = getByText(text)

    expect(textElement).toHaveStyle("font-size: 1.25rem")
  })
})
