import { getSiteContentMap, resolve } from "@/lib/site-content";
import { EditableText } from "@/components/edit/editable-text";

export async function Mission() {
  const c = await getSiteContentMap();

  const pillars = [
    { key: "mission.pillar1", title: "Cultural Preservation", desc: "Documenting and protecting sacred traditions", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { key: "mission.pillar2", title: "Media Storytelling", desc: "Creating powerful documentary content", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { key: "mission.pillar3", title: "Youth Empowerment", desc: "Inspiring the next generation of leaders", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { key: "mission.pillar4", title: "Humanitarian Service", desc: "Uplifting communities through action", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  ];

  return (
    <section id="mission" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <EditableText
            contentKey="mission.eyebrow"
            as="span"
            label="Eyebrow"
            value={resolve(c, "mission.eyebrow", "Our Purpose")}
            className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block"
          />
          <EditableText
            contentKey="mission.heading"
            as="h2"
            label="Heading"
            value={resolve(c, "mission.heading", "Mission and Vision")}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6"
          />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Mission */}
          <div className="bg-background/50 rounded p-8 lg:p-10 border border-gold/10 relative overflow-hidden group hover:border-gold/20 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-[80px] group-hover:bg-gold/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded bg-gold/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <EditableText
                contentKey="mission.missionTitle"
                as="h3"
                label="Mission title"
                value={resolve(c, "mission.missionTitle", "Our Mission")}
                className="font-heading text-2xl lg:text-3xl text-gold mb-6 tracking-wide"
              />
              <EditableText
                contentKey="mission.missionP1"
                as="p"
                multiline
                label="Mission paragraph 1"
                value={resolve(c, "mission.missionP1", "Ojú Imọ̀lẹ̀ Media Foundation is committed to preserving cultural heritage, spiritual wisdom, oral traditions, and community stories through media, documentation, education, humanitarian outreach, and global cultural archiving.")}
                className="text-cream/80 text-base lg:text-lg leading-relaxed mb-4"
              />
              <EditableText
                contentKey="mission.missionP2"
                as="p"
                multiline
                label="Mission paragraph 2"
                value={resolve(c, "mission.missionP2", "Rooted in Isese traditions and guided by the vision of unity, empowerment, and enlightenment, the foundation exists to honor ancestral knowledge, uplift communities, inspire future generations, and create lasting impact through storytelling, creativity, service, and cultural preservation.")}
                className="text-cream/60 text-base leading-relaxed"
              />
            </div>
          </div>

          {/* Vision */}
          <div className="bg-background/50 rounded p-8 lg:p-10 border border-gold/10 relative overflow-hidden group hover:border-gold/20 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-bronze/5 rounded-full blur-[80px] group-hover:bg-bronze/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded bg-gold/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <EditableText
                contentKey="mission.visionTitle"
                as="h3"
                label="Vision title"
                value={resolve(c, "mission.visionTitle", "Our Vision")}
                className="font-heading text-2xl lg:text-3xl text-gold mb-6 tracking-wide"
              />
              <EditableText
                contentKey="mission.visionP1"
                as="p"
                multiline
                label="Vision paragraph"
                value={resolve(c, "mission.visionP1", "To become a globally respected cultural media foundation dedicated to preserving heritage, documenting untold stories, empowering communities, supporting humanitarian work, uplifting youth, and inspiring future generations through media, education, storytelling, and cultural preservation.")}
                className="text-cream/80 text-base lg:text-lg leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <EditableText
            contentKey="mission.pillarsHeading"
            as="h3"
            label="Pillars heading"
            value={resolve(c, "mission.pillarsHeading", "Our Core Pillars")}
            className="font-heading text-xl lg:text-2xl text-cream text-center mb-12 tracking-wide block"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="text-center p-6 rounded bg-background/30 border border-gold/5 hover:border-gold/20 transition-colors duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pillar.icon} />
                  </svg>
                </div>
                <EditableText
                  contentKey={`${pillar.key}.title`}
                  as="p"
                  label="Pillar title"
                  value={resolve(c, `${pillar.key}.title`, pillar.title)}
                  className="text-cream font-medium tracking-wide mb-2"
                />
                <EditableText
                  contentKey={`${pillar.key}.desc`}
                  as="p"
                  label="Pillar description"
                  value={resolve(c, `${pillar.key}.desc`, pillar.desc)}
                  className="text-cream/50 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
