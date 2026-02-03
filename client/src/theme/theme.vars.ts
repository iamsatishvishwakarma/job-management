import { useTheme } from "@mui/material"
import { useEffect } from "react"

function ThemeCssVars() {
  const theme = useTheme()

  useEffect(() => {
    const root = document.documentElement

    root.style.setProperty("--palette-primary-main", theme.palette.primary.main)
  }, [theme])

  return null
}

export default ThemeCssVars
