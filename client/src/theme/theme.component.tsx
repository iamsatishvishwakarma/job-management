import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, THEME_ID, createTheme, responsiveFontSizes } from "@mui/material/styles"
import React from "react"

import type { Settings } from "@/components/ui/context/types"

import themeConfig from "@/configs/theme.config"

import Overrides from "./overrides"
import themeOptions from "./theme.options"
import ThemeCssVars from "./theme.vars"
import typography from "./typography"

interface Props {
  settings: Settings
  children: React.ReactNode
}

const ThemeComponent = (props: Props) => {
  // ** Props
  const { settings, children } = props

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(settings)

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig)

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...Overrides(theme) },
    typography: { ...typography(theme) },
  })

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <CssBaseline />
      <ThemeCssVars />
      {children}
    </ThemeProvider>
  )
}

export default ThemeComponent
