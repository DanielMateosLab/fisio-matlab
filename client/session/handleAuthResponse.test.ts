import { waitFor } from "@testing-library/react"
import handleAuthResponse from "./handleAuthResponse"
import { invalidCredentialsMessage } from "./Login"

describe("handleAuthResponse", () => {
  const email = "aaaaa@aaa.aa"
  const password = "a".repeat(8)
  const values = { email, password }

  const setSubmitting = jest.fn()
  const setErrors = jest.fn()
  const formikHelpers: any = {
    setSubmitting,
    setErrors,
  }

  const setFormError = jest.fn()
  const mockDispatch = jest.fn()
  const mockPush = jest.fn()

  const successfulApiRes = JSON.stringify({ status: "success" })
  const error = "mock error"
  const validationErrorApiRes = JSON.stringify({
    status: "error",
    payload: { email: error },
  })
  const formErrorApiRes = JSON.stringify({
    status: "error",
    message: error,
  })

  async function exec(operation: "login" | "signup" = "login") {
    await handleAuthResponse(
      values,
      formikHelpers,
      setFormError,
      mockDispatch,
      { push: mockPush } as any,
      error,
      operation
    )
  }

  describe("if api call finishes successful", () => {
    it("should dispatch authenticate action thunk with the email", async () => {
      fetchMock.once(successfulApiRes)
      await exec()

      await waitFor(() => {
        // No way to assert the anonymous function returned by the thunk
        expect(mockDispatch).toHaveBeenCalled()
      })
    })
    it("should redirect to /profile", async () => {
      fetchMock.once(successfulApiRes)
      await exec()
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/profile")
      })
    })
  })
  describe("if api call fails", () => {
    it("should set an email error if the response has a payload with an email property)", async () => {
      fetchMock.once(validationErrorApiRes)
      await exec()
      await waitFor(() => {
        expect(setErrors).toHaveBeenCalledWith({ email: error })
      })
    })
    it("should set a form error if the response has nor payload or email", async () => {
      fetchMock.once(formErrorApiRes)
      await exec()
      await waitFor(() => {
        expect(setFormError).toHaveBeenCalled()
      })
    })
    it("should set an invalidCredentialsMessage if there is an InvalidCredentialsError", async () => {
      const invalidCredentialsErrorApiRes = JSON.stringify({
        status: "error",
        message: "",
        name: "InvalidCredentialsError",
      })
      fetchMock.once(invalidCredentialsErrorApiRes)

      await exec()

      await waitFor(() => {
        expect(setFormError).toHaveBeenCalledWith(invalidCredentialsMessage)
      })
    })
  })
  it("should enable the submit button when the submission handling is done", async () => {
    fetchMock.once(successfulApiRes)
    await exec()
    await waitFor(() => {
      expect(setSubmitting).toHaveBeenCalledWith(false)
    })

    fetchMock.once(validationErrorApiRes)
    await exec()
    await waitFor(() => {
      expect(setSubmitting).toHaveBeenCalledWith(false)
    })

    fetchMock.once(formErrorApiRes)
    await exec()
    await waitFor(() => {
      expect(setSubmitting).toHaveBeenCalledWith(false)
    })
  })
  it("should call /api/login if operation is login", async () => {
    fetchMock.once(successfulApiRes)
    await exec()

    expect(fetchMock.mock.calls[0][0]).toEqual("/api/login")
  })
  it("should call /api/users if operation is signup", async () => {
    fetchMock.once(successfulApiRes)
    await exec("signup")

    expect(fetchMock.mock.calls[0][0]).toEqual("/api/users")
  })
})
