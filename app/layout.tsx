import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "Portfolio - Étudiant en Pharmacie | France",
  description:
    "Portfolio professionnel d'un étudiant en pharmacie en France. Découvrez mon parcours, mes compétences et mes projets de recherche.",
  keywords: ["pharmacie", "étudiant", "France", "portfolio", "médecine", "santé"],
    generator: 'v0.app'
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFCFD" },
    { media: "(prefers-color-scheme: dark)", color: "#1A2332" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${robotoMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
