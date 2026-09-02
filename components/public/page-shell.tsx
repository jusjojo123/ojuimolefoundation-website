import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"

/** A lightweight header for interior pages (the homepage uses its own). */
function InteriorHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <Image src="/images/logo.png" alt="Ojú Imọ̀lẹ̀ Media Foundation Logo" fill className="object-contain" />
          </div>
          <div className="hidden sm:block">
            <p className="font-heading text-gold text-base tracking-wider">Ojú Imọ̀lẹ̀</p>
            <p className="text-cream/50 text-[10px] tracking-[0.2em] uppercase">Media Foundation</p>
          </div>
        </Link>
        <Link
          href="/#donate"
          className="rounded-full gold-gradient px-5 py-2 text-sm font-medium tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Donate
        </Link>
      </div>
    </header>
  )
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <InteriorHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
