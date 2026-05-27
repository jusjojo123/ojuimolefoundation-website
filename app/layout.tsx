import type { Metadata, Viewport } from "next"
import { Cinzel, Cormorant_Garamond } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ojú Imọlẹ Media Foundation | Eye of Light",
  description:
    "Illuminating Culture. Preserving Heritage. Ojú Imọlẹ Media Foundation is committed to preserving cultural heritage, spiritual wisdom, oral traditions, and community stories through media, documentation, education, humanitarian outreach, and global cultural archiving.",
  keywords: [
    "Ojú Imọlẹ",
    "African culture",
    "cultural preservation",
    "Isese traditions",
    "heritage",
    "media foundation",
    "spiritual wisdom",
    "oral traditions",
  ],
  openGraph: {
    title: "Ojú Imọlẹ Media Foundation | Eye of Light",
    description: "Illuminating Culture. Preserving Heritage.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} bg-background`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
