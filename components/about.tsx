import Image from "next/image";
import { getSiteContentMap, resolve } from "@/lib/site-content";
import { EditableText } from "@/components/edit/editable-text";
import { EditableImage } from "@/components/edit/editable-image";

export async function About() {
  const c = await getSiteContentMap();
  const img = resolve(c, "about.image", "/images/cultural-preservation.jpg");

  const stats = [
    { key: "about.stat1", value: "2025", label: "Founded" },
    { key: "about.stat2", value: "T&T", label: "Based" },
    { key: "about.stat3", value: "Global", label: "Vision" },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bronze rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <EditableText
            contentKey="about.eyebrow"
            as="span"
            label="Eyebrow"
            value={resolve(c, "about.eyebrow", "Who We Are")}
            className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block"
          />
          <EditableText
            contentKey="about.heading"
            as="h2"
            label="Heading"
            value={resolve(c, "about.heading", "About The Foundation")}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6"
          />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <EditableImage contentKey="about.image" className="relative aspect-[4/3] rounded overflow-hidden block">
              <Image
                src={img || "/placeholder.svg"}
                alt="Cultural preservation and heritage documentation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </EditableImage>
            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 rounded -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/30" />
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <EditableText
              contentKey="about.p1"
              as="p"
              multiline
              label="Paragraph 1"
              value={resolve(
                c,
                "about.p1",
                "Ojú Imọ̀lẹ̀ Media Foundation is a Trinidad and Tobago based nonprofit cultural media foundation with an international vision rooted in Isese traditions, cultural preservation, media storytelling, education, youth empowerment, humanitarian outreach, and spiritual heritage documentation.",
              )}
              className="text-cream/80 text-lg lg:text-xl leading-relaxed"
            />
            <EditableText
              contentKey="about.p2"
              as="p"
              multiline
              label="Paragraph 2"
              value={resolve(
                c,
                "about.p2",
                "Our name, meaning “Eye of Light” in the Yoruba language, embodies our commitment to illuminating culture, preserving sacred knowledge, and shining light on untold stories that deserve to be shared with the world.",
              )}
              className="text-cream/70 text-base lg:text-lg leading-relaxed"
            />
            <EditableText
              contentKey="about.p3"
              as="p"
              multiline
              label="Paragraph 3"
              value={resolve(
                c,
                "about.p3",
                "The foundation welcomes people of all backgrounds who genuinely support cultural awareness, education, humanitarian development, and the preservation of sacred traditions and community history globally.",
              )}
              className="text-cream/70 text-base lg:text-lg leading-relaxed"
            />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/10 mt-8">
              {stats.map((s) => (
                <div key={s.key} className="text-center">
                  <EditableText
                    contentKey={`${s.key}.value`}
                    as="p"
                    label="Stat value"
                    value={resolve(c, `${s.key}.value`, s.value)}
                    className="font-heading text-2xl lg:text-3xl text-gold mb-1"
                  />
                  <EditableText
                    contentKey={`${s.key}.label`}
                    as="p"
                    label="Stat label"
                    value={resolve(c, `${s.key}.label`, s.label)}
                    className="text-cream/40 text-xs tracking-wider uppercase"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
