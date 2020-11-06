import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import { FieldHookConfig, useField } from "formik"
import { InputHTMLAttributes } from "react"

interface Props {
  label: string
  type: InputHTMLAttributes<HTMLInputElement>
}
type ComposedProps = FieldHookConfig<any> & TextFieldProps & Props

export default function FormikTextInput({
  label,
  type,
  ...props
}: ComposedProps) {
  const [field, meta] = useField(props)

  delete props.validate // Causes an error if passed to TextField

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      type={type}
      variant="outlined"
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  )
}
