import type { Metadata } from "next";
import { Cinzel, Lora } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ojú Imọlẹ Media Foundation | The Eye of Light",
  description:
    "A Trinidad and Tobago based nonprofit cultural media foundation with an international vision rooted in Isese traditions, cultural preservation, media storytelling, humanitarian outreach, education, youth empowerment, and spiritual heritage documentation.",
  keywords:
    "Ojú Imọlẹ,media foundation,cultural preservation,Isese traditions,Trinidad and Tobago,documentary,humanitarian,youth empowerment",
  openGraph: {
    title: "Ojú Imọlẹ Media Foundation | The Eye of Light",
    description:
      "A Trinidad and Tobago based nonprofit cultural media foundation with an international vision rooted in Isese traditions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable} bg-background`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
