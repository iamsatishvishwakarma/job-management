import TextField, { type TextFieldProps } from "@mui/material/TextField"
// Type Imports
import React from "react"
// Third party Libraries Imports
import { Controller, useFormContext } from "react-hook-form"

type FormTextFieldProps = {
  name: string
} & TextFieldProps

const FormTextField: React.FC<FormTextFieldProps> = ({ name, ...rest }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          error={!!fieldState.error || false}
          helperText={fieldState.error?.message}
          fullWidth
        />
      )}
    />
  )
}

export default FormTextField
