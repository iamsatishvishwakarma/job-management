"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { ToastProvider } from "@/components/ui/context/providers/toast.provider"
import { persistor, store } from "@/store"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ToastProvider>
                {children}
              </ToastProvider>
            </PersistGate>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
