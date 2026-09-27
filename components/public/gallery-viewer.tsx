"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import type { GalleryImage } from "@/lib/db/schema"

export function GalleryViewer({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (active === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, close, prev, next])

  if (!images?.length) return null

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-gold/15"
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img.url || "/placeholder.svg"}
              alt={img.alt ?? ""}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={close} className="absolute right-5 top-5 text-cream/70 hover:text-gold text-3xl leading-none" aria-label="Close">
            ×
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 text-cream/70 hover:text-gold text-4xl px-3" aria-label="Previous">
            ‹
          </button>
          <div className="relative max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative mx-auto" style={{ height: "80vh" }}>
              <Image
                src={images[active].url || "/placeholder.svg"}
                alt={images[active].alt ?? ""}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {images[active].alt && (
              <p className="mt-3 text-center text-sm text-cream/60">{images[active].alt}</p>
            )}
          </div>
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 text-cream/70 hover:text-gold text-4xl px-3" aria-label="Next">
            ›
          </button>
        </div>
      )}
    </>
  )
}
