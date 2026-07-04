import Image from "next/image";
import { getPublishedContent } from "@/lib/content";

export async function CommunityProjects() {
  const items = await getPublishedContent("project");
  if (items.length === 0) return null;

  return (
    <section id="community-projects" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Making a Difference
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Community Projects
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Initiatives and outreach that uplift and empower our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-background/50 rounded overflow-hidden border border-gold/10 hover:border-gold/20 transition-colors group"
            >
              {item.imageUrl && (
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-heading text-xl text-cream mb-2">{item.title}</h3>
                {item.location && (
                  <p className="text-gold/50 text-sm mb-2">{item.location}</p>
                )}
                {item.description && (
                  <p className="text-cream/60 text-sm leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
