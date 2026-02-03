"use client"
import { type AlertColor } from "@mui/material"

import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useState, type ReactNode } from "react"

import { ToastContext } from "../toast.context"

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<AlertColor>("error")

  const showToast = (msg: string, type: AlertColor = "error") => {
    setMessage(msg)
    setSeverity(type)
    setOpen(true)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} variant="standard">
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}
