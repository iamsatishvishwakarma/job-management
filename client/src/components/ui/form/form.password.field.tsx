"use client"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField, { type TextFieldProps } from "@mui/material/TextField"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import React, { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

import AppIcon from "@/components/shared/app.icon"

type FormPasswordFieldProps = {
  name: string
} & TextFieldProps

const FormPasswordField: React.FC<FormPasswordFieldProps> = ({ name, helperText, ...rest }) => {
  const { control } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...rest}
          {...field}
          value={field.value ?? ""}
          type={showPassword ? "text" : "password"}
          error={!!fieldState.error}
          helperText={fieldState.error?.message || helperText || " "}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <AppIcon icon={showPassword ? IconEyeOff : IconEye} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

export default FormPasswordField
