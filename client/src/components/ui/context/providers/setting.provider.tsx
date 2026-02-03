"use client"
import { useState, type ReactNode } from "react"

import themeConfig from "@/configs/theme.config"

import type { Settings } from "../types"

import { SettingsContext } from "../setting.context"

const initialSettings: Settings = {
  themeColor: "primary",
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(initialSettings)

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
