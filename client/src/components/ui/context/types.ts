import type { PaletteMode } from "@mui/material"

import type { ContentWidth } from "@/configs/theme.config"

export type ThemeColor = "primary" | "secondary" | "error" | "warning" | "info" | "success"

export interface Settings {
  mode: PaletteMode
  themeColor: ThemeColor
  contentWidth: ContentWidth
}

export interface SettingsContextValue {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
}
