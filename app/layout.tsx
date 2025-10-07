import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-context"
import { NavigationProvider } from "@/lib/navigation-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "StudyQuest - Gamified Language Learning",
  description: "Learn languages through an engaging, game-like experience",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <NavigationProvider>
            <AuthProvider>{children}</AuthProvider>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}