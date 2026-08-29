import Image from "next/image";
import { getSiteContentMap, resolve } from "@/lib/site-content";
import { EditableText } from "@/components/edit/editable-text";
import { EditableImage } from "@/components/edit/editable-image";

export async function Programs() {
  const c = await getSiteContentMap();

  const programs = [
    { key: "programs.item1", title: "Cultural Preservation", description: "Documenting and archiving sacred traditions, oral histories, and cultural practices for future generations.", image: "/images/cultural-event.jpg" },
    { key: "programs.item2", title: "Humanitarian Outreach", description: "Supporting families, youth, and vulnerable community members through charitable initiatives and direct assistance.", image: "/images/charity-work.jpg" },
    { key: "programs.item3", title: "Education and Youth Development", description: "Empowering young people through cultural education, leadership programs, and creative development opportunities.", image: "/images/youth-education.jpg" },
    { key: "programs.item4", title: "Media and Documentary", description: "Professional media production capturing cultural stories, community voices, and heritage documentation.", image: "/images/media-production.jpg" },
  ];

  return (
    <section id="programs" className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <EditableText
            contentKey="programs.eyebrow"
            as="span"
            label="Eyebrow"
            value={resolve(c, "programs.eyebrow", "What We Do")}
            className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block"
          />
          <EditableText
            contentKey="programs.heading"
            as="h2"
            label="Heading"
            value={resolve(c, "programs.heading", "Our Programs")}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6"
          />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <EditableText
            contentKey="programs.intro"
            as="p"
            multiline
            label="Intro"
            value={resolve(c, "programs.intro", "From cultural preservation to humanitarian service, our programs create meaningful impact")}
            className="text-cream/60 text-lg max-w-2xl mx-auto"
          />
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div
              key={program.key}
              className="group relative rounded overflow-hidden bg-card border border-gold/10 hover:border-gold/20 transition-all duration-500"
            >
              {/* Image */}
              <EditableImage contentKey={`${program.key}.image`} className="relative h-64 overflow-hidden block">
                <Image
                  src={resolve(c, `${program.key}.image`, program.image) || "/placeholder.svg"}
                  alt={resolve(c, `${program.key}.title`, program.title)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </EditableImage>

              {/* Content */}
              <div className="relative p-6 lg:p-8 -mt-16 z-10">
                <EditableText
                  contentKey={`${program.key}.title`}
                  as="h3"
                  label="Program title"
                  value={resolve(c, `${program.key}.title`, program.title)}
                  className="font-heading text-xl lg:text-2xl text-gold mb-3 tracking-wide"
                />
                <EditableText
                  contentKey={`${program.key}.description`}
                  as="p"
                  multiline
                  label="Program description"
                  value={resolve(c, `${program.key}.description`, program.description)}
                  className="text-cream/70 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div className="mt-20 text-center">
          <EditableText
            contentKey="programs.eventsHeading"
            as="h3"
            label="Events heading"
            value={resolve(c, "programs.eventsHeading", "Events and Community Programs")}
            className="font-heading text-2xl lg:text-3xl text-cream mb-6 tracking-wide block"
          />
          <EditableText
            contentKey="programs.eventsText"
            as="p"
            multiline
            label="Events text"
            value={resolve(c, "programs.eventsText", "Join us for cultural celebrations, educational workshops, community gatherings, and service events throughout the year.")}
            className="text-cream/60 text-lg max-w-2xl mx-auto mb-8"
          />
          <div className="inline-flex items-center gap-3 bg-card border border-gold/20 rounded px-8 py-4">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <EditableText
              contentKey="programs.eventsBadge"
              as="span"
              label="Events badge"
              value={resolve(c, "programs.eventsBadge", "Upcoming Events To Be Announced")}
              className="text-cream/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
