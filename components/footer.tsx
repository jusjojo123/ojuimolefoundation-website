"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/30 bg-card/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-20 h-20 relative mb-4">
            <Image
              src="/images/logo.png"
              alt="Ojú Imọlẹ Logo"
              fill
              className="object-contain"
            />
          </div>
          
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-primary tracking-wider mb-2">
            OJÚ IMỌLẸ MEDIA FOUNDATION
          </h3>
          
          <p className="text-muted-foreground italic mb-6">
            Illuminating Culture. Preserving Heritage.
          </p>
          
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />
          
          <p className="text-sm text-muted-foreground max-w-md">
            Committed to preserving cultural heritage, spiritual wisdom, and community stories 
            for future generations.
          </p>
          
          <p className="text-xs text-muted-foreground/60 mt-8">
            &copy; {new Date().getFullYear()} Ojú Imọlẹ Media Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
