import sessionReducer, { authSuccess, logoutSuccess } from "./sessionSlice"

const emptyInitialState = sessionReducer(undefined, { type: "" })

it("should handle authSuccess and update the state email", () => {
  const email = "aaaa"

  const state = sessionReducer(undefined, authSuccess({ email }))

  expect(state.email).toEqual(email)
})
it("should handle logoutSuccess and clean the state email", () => {
  const state = sessionReducer(
    { ...emptyInitialState, email: "aaaa" },
    logoutSuccess()
  )

  expect(state.email).toEqual("")
})
