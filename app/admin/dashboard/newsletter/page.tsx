import { requireAdmin } from "@/lib/auth-helpers"
import { listSubscribers, subscriberStats } from "@/app/actions/newsletter"
import { SubscriberList } from "@/components/admin/subscriber-list"

export const dynamic = "force-dynamic"

export default async function NewsletterPage() {
  await requireAdmin()
  const [subscribers, stats] = await Promise.all([listSubscribers(), subscriberStats()])

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-gold tracking-wide">Newsletter</h1>
        <p className="text-sm text-cream/50 mt-1">
          People who signed up to receive updates from the foundation.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Stat label="Total" value={stats.total} />
        <Stat label="Active" value={stats.active} />
        <Stat label="Unsubscribed" value={stats.unsubscribed} />
      </div>

      <SubscriberList initial={subscribers} />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-card border border-border px-5 py-4">
      <p className="text-3xl font-heading text-gold">{value}</p>
      <p className="text-xs uppercase tracking-wider text-cream/50 mt-1">{label}</p>
    </div>
  )
}
