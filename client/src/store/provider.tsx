"use client"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./index"
import { useEffect } from "react"
import { AlertColor } from "@mui/material"
import { useToast } from "@/utils/hooks/use.toast"
import { setToastRef } from "@/components/refs/toast.ref"

function ReduxProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast()
  useEffect(() => {
    setToastRef((msg: string, severity: AlertColor) => showToast(msg, severity || "error"))
  }, [showToast])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
