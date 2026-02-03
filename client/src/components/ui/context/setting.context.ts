import { createContext } from "react"

import themeConfig from "@/configs/theme.config"

import type { SettingsContextValue, Settings } from "./types"

const initialSettings: Settings = {
  themeColor: "primary",
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
}

export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => undefined,
  settings: initialSettings,
})

export const SettingsConsumer = SettingsContext.Consumer
