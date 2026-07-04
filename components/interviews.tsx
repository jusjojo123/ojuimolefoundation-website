import Image from "next/image";
import { getPublishedContent } from "@/lib/content";
import { VideoEmbed } from "@/components/video-embed";

export async function Interviews() {
  const items = await getPublishedContent("interview");
  if (items.length === 0) return null;

  return (
    <section id="interviews" className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            In Their Words
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Interviews
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Conversations with elders, leaders, and voices of our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded overflow-hidden border border-gold/10 hover:border-gold/20 transition-colors"
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                {item.videoUrl ? (
                  <VideoEmbed url={item.videoUrl} title={item.title} poster={item.imageUrl} />
                ) : item.imageUrl ? (
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                ) : null}
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-cream mb-2">{item.title}</h3>
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
