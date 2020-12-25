import { render } from "../clientShared/testUtils"
import Profile from "./Profile"

const mockPush = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe("Me", () => {
  it("should redirect to the login page if there is no session", () => {
    render(<Profile />)

    expect(mockPush).toHaveBeenCalledWith("/login")
  })
  // With session
  it.todo("should show the user email")

  describe("it should have a change-password form", () => {
    it.todo('should have a "current password" field')
    it.todo('should have a "new password" field')
    it.todo('should have a "repeat new password" field')
    it.todo("should have a submit button")
  })

  it.todo("should have a logout button")

  it.todo("should have a delete account button")
  it.todo("the delete account button should trigger the delete account dialog")
})
