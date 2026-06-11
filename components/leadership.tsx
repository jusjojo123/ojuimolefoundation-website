import Image from "next/image";

const leadershipTeam = [
  {
    name: "Jolene Smart",
    role: "Founder and Executive Director",
    description: "Leads the overall vision and direction of Ojú Imọlẹ Media Foundation. Oversees media production, storytelling, and cultural documentation, ensuring the foundation remains aligned with its mission of illuminating culture and empowering communities.",
    image: "/images/jolene-smart-leadership.jpg",
    imagePosition: "object-center",
    isFramed: true,
  },
  {
    name: "Olumbe Diaz",
    role: "Director of Cultural Affairs and Strategic Development",
    description: "Responsible for cultural preservation, strategic planning, and organizational development. Brings extensive experience in cultural work and supports the foundation in building strong cultural programs and long term growth.",
    image: "/images/olumbe-diaz.jpg",
    imagePosition: "object-center",
    isFramed: true,
  },
  {
    name: "Keisha Smart Ellis",
    role: "Director of Charity and Community Outreach",
    description: "Leads all humanitarian and charity initiatives. Oversees community outreach programs, support services, and initiatives focused on assisting families, youth, and vulnerable members of the community.",
    image: "/images/keisha-smart-ellis.jpg",
    imagePosition: "object-center",
    isFramed: true,
  },
  {
    name: "Afiya Diaz",
    role: "Director of Education, Culture, and Media Support",
    description: "An educator and cultural advocate responsible for educational programs, cultural development initiatives, and supporting media production efforts within the foundation. Plays an active role in storytelling and creative documentation.",
    image: "/images/afiya-diaz.jpg",
    imagePosition: "object-[center_20%]",
    isFramed: false,
  },
  {
    name: "Yannick Finch",
    role: "Director of Youth Development and Empowerment",
    description: "Responsible for youth engagement, mentorship, empowerment initiatives, and community development programs within the foundation. Supports activities focused on inspiring young people through culture, education, leadership, creativity, media, and positive community involvement while helping to build the next generation of empowered leaders.",
    image: "/images/yannick-finch.jpg",
    imagePosition: "object-[center_15%]",
    isFramed: false,
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
