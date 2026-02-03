import type { AlertColor } from "@mui/material"

let toastFn: ((message: string, severity: AlertColor) => void) | null = null

export const setToastRef = (fn: (message: string, severity: AlertColor) => void) => {
  toastFn = fn
}

export const showErrorToast = (message: string, severity?: AlertColor) => {
  if (toastFn) {
    toastFn(message, severity || "error")
  }
}
