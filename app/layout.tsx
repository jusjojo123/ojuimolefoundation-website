import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ojú Imọlẹ Media Foundation | Eye of Light",
  description:
    "Ojú Imọlẹ Media Foundation preserves cultural heritage, documents sacred traditions, empowers communities, and inspires future generations through media, education, and cultural preservation. Based in Trinidad and Tobago, West Indies.",
  keywords: [
    "Ojú Imọlẹ",
    "Eye of Light",
    "cultural heritage",
    "media foundation",
    "Trinidad and Tobago",
    "sacred traditions",
    "cultural preservation",
  ],
  authors: [{ name: "Ojú Imọlẹ Media Foundation" }],
  openGraph: {
    title: "Ojú Imọlẹ Media Foundation | Eye of Light",
    description:
      "Preserving cultural heritage and sacred traditions through media, education, and cultural preservation.",
    type: "website",
    locale: "en_TT",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${cinzel.variable} ${cormorant.variable} font-sans min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
