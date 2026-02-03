'use client'

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ToastProvider } from "@/components/ui/context/providers/toast.provider"
import ThemeComponent from "@/theme/theme.component"
import { SettingsProvider } from "@/components/ui/context/providers/setting.provider"
import { SettingsConsumer } from "@/components/ui/context/setting.context"
import ReduxProvider from "@/store/provider"

export default function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ToastProvider>
        <ReduxProvider>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeComponent settings={settings}>
                  {children}
                </ThemeComponent>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </ReduxProvider>
      </ToastProvider>
    </AppRouterCacheProvider>
  )
}