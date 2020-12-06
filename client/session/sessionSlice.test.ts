import sessionReducer, { authSuccess } from "./sessionSlice"

it("should handle authSuccess and update the state email", () => {
  const email = "aaaa"

  const state = sessionReducer(undefined, authSuccess({ email }))

  expect(state.email).toEqual(email)
})
