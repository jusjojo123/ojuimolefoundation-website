import type React from "react"

export function AdminInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-cream/80">{label}</span>}
      <input
        {...props}
        className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-cream placeholder:text-muted-foreground outline-none transition-colors focus:border-gold"
      />
    </label>
  )
}

export function AdminTextarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-cream/80">{label}</span>}
      <textarea
        {...props}
        className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-cream placeholder:text-muted-foreground outline-none transition-colors focus:border-gold resize-y min-h-24"
      />
    </label>
  )
}

export function AdminButton({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const styles =
    variant === "primary"
      ? "bg-gold text-background hover:bg-gold-light"
      : variant === "danger"
        ? "bg-transparent border border-red-500/40 text-red-400 hover:bg-red-500/10"
        : "bg-transparent border border-border text-cream hover:bg-muted"
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles} ${className}`}
    />
  )
}

export function AdminCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-6 ${className}`}>{children}</div>
  )
}
