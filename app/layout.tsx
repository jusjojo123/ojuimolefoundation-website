import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import { AnalyticsTracker } from "@/components/analytics-tracker";
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

const siteUrl = "https://www.ojuimolefoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ojú Imọ̀lẹ̀ Media Foundation | Eye of Light",
  description:
    "Ojú Imọ̀lẹ̀ Media Foundation preserves cultural heritage, documents sacred traditions, empowers communities, and inspires future generations through media, education, and cultural preservation. Based in Trinidad and Tobago, West Indies.",
  keywords: [
    "Ojú Imọ̀lẹ̀",
    "Eye of Light",
    "cultural heritage",
    "media foundation",
    "Trinidad and Tobago",
    "sacred traditions",
    "cultural preservation",
  ],
  authors: [{ name: "Ojú Imọ̀lẹ̀ Media Foundation" }],
  creator: "Ojú Imọ̀lẹ̀ Media Foundation",
  publisher: "Ojú Imọ̀lẹ̀ Media Foundation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ojú Imọ̀lẹ̀ Media Foundation | Eye of Light",
    description:
      "Preserving cultural heritage and sacred traditions through media, education, and cultural preservation.",
    url: siteUrl,
    siteName: "Ojú Imọ̀lẹ̀ Media Foundation",
    type: "website",
    locale: "en_TT",
    images: [
      {
        url: "/images/hero-sacred-flames.jpg",
        width: 1200,
        height: 630,
        alt: "Ojú Imọ̀lẹ̀ Media Foundation | Eye of Light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojú Imọ̀lẹ̀ Media Foundation | Eye of Light",
    description:
      "Preserving cultural heritage and sacred traditions through media, education, and cultural preservation.",
    images: ["/images/hero-sacred-flames.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "Nonprofit Organization",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Ojú Imọ̀lẹ̀ Media Foundation",
  alternateName: "Eye of Light",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/hero-sacred-flames.jpg`,
  description:
    "Ojú Imọ̀lẹ̀ Media Foundation preserves cultural heritage, documents sacred traditions, empowers communities, and inspires future generations through media, education, and cultural preservation.",
  email: "ojuimolefoundation@gmail.com",
  telephone: "+1-868-254-2540",
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6th Company Village, New Grant",
    addressCountry: "TT",
    addressRegion: "Trinidad and Tobago",
  },
  sameAs: [
    "https://facebook.com/OjuImoleMedia",
    "https://instagram.com/ojuimolemedia",
    "https://tiktok.com/@ojuimolemedia",
  ],
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="bg-background">
      <body
        className={`${cinzel.variable} ${cormorant.variable} font-sans min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
