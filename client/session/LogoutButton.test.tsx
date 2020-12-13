import userEvent from "@testing-library/user-event"
import { render } from "../clientShared/testUtils"
import LogoutButton from "./LogoutButton"
import { logoutSuccess } from "./sessionSlice"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}))

describe("Logout Button", () => {
  let LogoutButtonElement: HTMLElement

  beforeEach(() => {
    const { getByRole } = render(<LogoutButton />)
    LogoutButtonElement = getByRole("button")
  })

  it("should render the button element", () => {
    expect(LogoutButtonElement).toBeInTheDocument()
  })
  test("should dispatch an action to the store when clicking it", () => {
    userEvent.click(LogoutButtonElement)

    expect(mockDispatch).toBeCalledWith(logoutSuccess())
  })
})
