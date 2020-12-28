import { mockPush, callHookInComponent } from "./testUtils"
import useRedirectUnauth from "./useRedirectUnauth"

jest.mock("./useIsAuth", () => () => false)

describe("useRedirectUnauth", () => {
  it("should redirect to /login if there is no session", () => {
    callHookInComponent(useRedirectUnauth)

    expect(mockPush).toHaveBeenCalledWith("/login")
  })
})
