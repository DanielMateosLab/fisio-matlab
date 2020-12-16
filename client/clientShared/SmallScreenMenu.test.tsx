import { RenderResult } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SmallScreenMenu from "./SmallScreenMenu"
import { render } from "./testUtils"

describe("Small screen sizes", () => {
  describe("menu button", () => {
    let menuButtonElement: HTMLElement
    let queries: RenderResult

    beforeEach(() => {
      queries = render(<SmallScreenMenu />)
      menuButtonElement = queries.getByRole("button", { name: "open menu" })
    })
    it("should have a menu button", () => {
      expect(menuButtonElement).toBeInTheDocument()
    })
    test("a navbar should be displayed after clicking the menu button", () => {
      userEvent.click(menuButtonElement)

      expect(queries.getByRole("menubar")).toBeInTheDocument()
    })
  })
})
