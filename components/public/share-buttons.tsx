"use client"

import { useState } from "react"

type Props = { url: string; title: string }

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs uppercase tracking-wider text-cream/40">Share</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold/30 text-cream/80 hover:text-gold hover:border-gold/60 px-4 py-1.5 text-sm transition-colors"
        >
          {l.name}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="rounded-full border border-gold/30 text-cream/80 hover:text-gold hover:border-gold/60 px-4 py-1.5 text-sm transition-colors"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  )
}
