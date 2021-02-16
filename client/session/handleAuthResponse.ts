import { LoginResponse, UsersPostResponse } from "appShared/types"
import { useThunkDispatch } from "client/redux/store"
import { FormikHelpers } from "formik"
import { NextRouter } from "next/router"
import { fetchPostOrPut } from "server/apiUtils"
import { authFulfilled } from "./sessionSlice"

export default async function handleAuthResponse(
  values: any,
  { setSubmitting, setErrors }: FormikHelpers<any>,
  setFormError: React.Dispatch<React.SetStateAction<string>>,
  dispatch: ReturnType<typeof useThunkDispatch>,
  router: NextRouter,
  defaultErrorMessage: string
): Promise<void> {
  try {
    const response: UsersPostResponse | LoginResponse = await fetchPostOrPut(
      "/api/users",
      values
    )

    if (response.status == "success") {
      dispatch(authFulfilled({ email: values.email }))
      router.push("/profile")
    } else if (response.status == "error" && response.payload !== undefined) {
      setErrors(response.payload as any)
    } else {
      /*  Throwing null passes control to the catch
      block, where a default error message is set. */
      throw null
    }
  } catch (e) {
    setFormError(defaultErrorMessage)
  } finally {
    setSubmitting(false)
  }
}
