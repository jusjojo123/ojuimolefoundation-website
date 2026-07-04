import { getPublishedContent } from "@/lib/content";

export async function Announcements() {
  const items = await getPublishedContent("announcement");
  if (items.length === 0) return null;

  return (
    <section id="announcements" className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Stay Informed
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Announcements
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            News and important notices from the foundation
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded p-6 lg:p-8 border border-gold/10 hover:border-gold/20 transition-colors"
            >
              <h3 className="font-heading text-xl lg:text-2xl text-cream mb-3">{item.title}</h3>
              {item.description && (
                <p className="text-cream/70 leading-relaxed mb-2">{item.description}</p>
              )}
              {item.body && (
                <p className="text-cream/50 leading-relaxed whitespace-pre-line">{item.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
