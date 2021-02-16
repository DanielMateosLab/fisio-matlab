import { waitFor } from "@testing-library/react"
import handleAuthResponse from "./handleAuthResponse"
import { authFulfilled } from "./sessionSlice"

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

  describe("if api call finishes successful", () => {
    it("should dispatch authFulfilled with the email", async () => {
      fetchMock.once(successfulApiRes)
      await handleAuthResponse(
        values,
        formikHelpers,
        setFormError,
        mockDispatch,
        { push: mockPush } as any,
        error
      )

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(authFulfilled({ email }))
      })
    })
    it("should redirect to /profile", async () => {
      fetchMock.once(successfulApiRes)
      await handleAuthResponse(
        values,
        formikHelpers,
        setFormError,
        mockDispatch,
        { push: mockPush } as any,
        error
      )
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/profile")
      })
    })
  })
  describe("if api call fails", () => {
    it("should set an email error if the response has a payload with an email property)", async () => {
      fetchMock.once(validationErrorApiRes)
      await handleAuthResponse(
        values,
        formikHelpers,
        setFormError,
        mockDispatch,
        { push: mockPush } as any,
        error
      )
      await waitFor(() => {
        expect(setErrors).toHaveBeenCalledWith({ email: error })
      })
    })
    it("should set a form error if the response has nor payload or email", async () => {
      fetchMock.once(formErrorApiRes)
      await handleAuthResponse(
        values,
        formikHelpers,
        setFormError,
        mockDispatch,
        { push: mockPush } as any,
        error
      )
      await waitFor(() => {
        expect(setFormError).toHaveBeenCalled()
      })
    })
  })
  it("should enable the submit button when the submission handling is done", async () => {
    fetchMock.once(successfulApiRes)
    await handleAuthResponse(
      values,
      formikHelpers,
      setFormError,
      mockDispatch,
      { push: mockPush } as any,
      error
    )
    await waitFor(() => {
      expect(setSubmitting).toHaveBeenCalledWith(false)
    })

    fetchMock.once(validationErrorApiRes)
    await handleAuthResponse(
      values,
      formikHelpers,
      setFormError,
      mockDispatch,
      { push: mockPush } as any,
      error
    )
    await waitFor(() => {
      expect(setSubmitting).toHaveBeenCalledWith(false)
    })

    fetchMock.once(formErrorApiRes)
    await handleAuthResponse(
      values,
      formikHelpers,
      setFormError,
      mockDispatch,
      { push: mockPush } as any,
      error
    )
    await waitFor(() => {
      expect(setSubmitting).toHaveBeenCalledWith(false)
    })
  })
})
