import Image from "next/image";
import { getPublishedLeadership } from "@/lib/leadership";
import { getSiteContentMap, resolve } from "@/lib/site-content";
import { EditableText } from "@/components/edit/editable-text";

export async function Leadership() {
  const [team, c] = await Promise.all([getPublishedLeadership(), getSiteContentMap()]);

  return (
    <section id="leadership" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <EditableText
            contentKey="leadership.eyebrow"
            as="span"
            label="Eyebrow"
            className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block"
            value={resolve(c, "leadership.eyebrow", "Our People")}
          />
          <EditableText
            contentKey="leadership.title"
            as="h2"
            label="Heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6"
            value={resolve(c, "leadership.title", "Leadership Team")}
          />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <EditableText
            contentKey="leadership.subtitle"
            as="p"
            label="Subtitle"
            multiline
            className="text-cream/60 text-lg max-w-2xl mx-auto"
            value={resolve(
              c,
              "leadership.subtitle",
              "Dedicated individuals committed to preserving heritage and empowering communities",
            )}
          />
        </div>

        {/* Leadership Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.id}
              className={`bg-background/50 rounded p-8 border border-gold/10 hover:border-gold/20 transition-all duration-300 group ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Photo */}
              <div className={`mx-auto mb-6 flex items-center justify-center ${
                member.isFramed
                  ? "w-48 h-48 lg:w-56 lg:h-56"
                  : "w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-gold/20 bg-card group-hover:border-gold/40 transition-colors"
              }`}>
                {member.image ? (
                  member.isFramed ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={224}
                      height={224}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={192}
                      height={192}
                      className={`w-full h-full object-cover ${member.imagePosition} scale-110`}
                    />
                  )
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-12 h-12 text-gold/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-cream/40 text-xs tracking-wider">Leadership Photo<br />To Be Added</p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-heading text-xl text-gold mb-2 tracking-wide">
                  {member.name}
                </h3>
                <p className="text-cream/60 text-sm tracking-wider uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
