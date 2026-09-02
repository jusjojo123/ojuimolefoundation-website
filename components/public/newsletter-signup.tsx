"use client"

import { useState, useTransition } from "react"
import { subscribe } from "@/app/actions/newsletter"

export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  return (
    <section id="newsletter" className="border-t border-gold/10 bg-card/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl text-gold tracking-wide text-balance">
          Stay Connected to the Light
        </h2>
        <p className="text-cream/60 mt-3 text-pretty leading-relaxed">
          Subscribe for updates on our cultural work, events, and stories of heritage from
          Trinidad and Tobago.
        </p>

        {status === "success" ? (
          <p className="mt-6 text-gold" role="status">
            Thank you for subscribing. Welcome to the Ojú Imọ̀lẹ̀ community.
          </p>
        ) : (
          <form
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              startTransition(async () => {
                const res = await subscribe(formData)
                if (res.ok) {
                  setStatus("success")
                } else {
                  setStatus("error")
                  setMessage(res.error ?? "Something went wrong.")
                }
              })
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full bg-background border border-border px-5 py-3 text-sm text-cream outline-none focus:border-gold/60"
            />
            <input type="hidden" name="source" value="homepage" />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full gold-gradient px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
            >
              {isPending ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {message}
          </p>
        )}
      </div>
    </section>
  )
}
