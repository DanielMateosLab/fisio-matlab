import { mockPush, callHookInComponent } from "./testUtils"
import useRedirectAuth from "./useRedirectAuth"

jest.mock("./useIsAuth", () => () => true)

describe("useRedirectAuth", () => {
  it("should redirect to /profile if there is no session", () => {
    callHookInComponent(useRedirectAuth)

    expect(mockPush).toHaveBeenCalledWith("/profile")
  })
})
