const leadershipTeam = [
  {
    name: "Jolene Smart",
    role: "Founder and Executive Director",
    description: "Leads the overall vision and direction of Ojú Imọlẹ Media Foundation. Oversees media production, storytelling, and cultural documentation, ensuring the foundation remains aligned with its mission of illuminating culture and empowering communities.",
  },
  {
    name: "Olumbe Diaz",
    role: "Director of Cultural Affairs and Strategic Development",
    description: "Responsible for cultural preservation, strategic planning, and organizational development. Brings extensive experience in cultural work and supports the foundation in building strong cultural programs and long term growth.",
  },
  {
    name: "Keisha Smart Ellis",
    role: "Director of Charity and Community Outreach",
    description: "Leads all humanitarian and charity initiatives. Oversees community outreach programs, support services, and initiatives focused on assisting families, youth, and vulnerable members of the community.",
  },
  {
    name: "Afiya Diaz",
    role: "Director of Education, Culture, and Media Support",
    description: "An educator and cultural advocate responsible for educational programs, cultural development initiatives, and supporting media production efforts within the foundation. Plays an active role in storytelling and creative documentation.",
  },
  {
    name: "Yannick Finch",
    role: "Director of Youth Development and Empowerment",
    description: "Responsible for youth engagement, mentorship, empowerment initiatives, and community development programs within the foundation. Supports activities focused on inspiring young people through culture, education, leadership, creativity, media, and positive community involvement while helping to build the next generation of empowered leaders.",
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Our People
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Leadership Team
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Dedicated individuals committed to preserving heritage and empowering communities
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipTeam.map((member, index) => (
            <div
              key={member.name}
              className={`bg-background/50 rounded p-8 border border-gold/10 hover:border-gold/20 transition-all duration-300 group ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Photo Placeholder */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border border-gold/20 bg-card flex items-center justify-center group-hover:border-gold/40 transition-colors">
                <div className="text-center">
                  <svg className="w-8 h-8 text-gold/30 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-cream/30 text-[8px] tracking-wider">Photo To<br />Be Added</p>
                </div>
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
