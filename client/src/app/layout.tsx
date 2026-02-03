import { Inter } from "next/font/google"
import "./globals.css"
import MainProvider from "@/components/shared/main.provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  )
}
