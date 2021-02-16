import { LoginData, SignupData } from "appShared/types"
import { FormikHelpers } from "formik"

export default async function handleAuthResponse(
  values: LoginData | SignupData,
  { setSubmitting, setErrors }: FormikHelpers<LoginData | SignupData>
): Promise<void> {}
