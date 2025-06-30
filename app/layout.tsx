import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "eh - Свобода в интернете возможна",
  description: "Мультисервис интернет активизма. Защищаем права на свободу информации, слова и доступа к интернету.",
  icons: {
    icon: "/favicon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-black text-white">
        <Navigation />
        <main className="pt-20">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
