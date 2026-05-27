import Image from "next/image";

const programs = [
  {
    title: "Cultural Preservation",
    description: "Documenting and archiving sacred traditions, oral histories, and cultural practices for future generations.",
    image: "/images/cultural-preservation.jpg",
  },
  {
    title: "Humanitarian Outreach",
    description: "Supporting families, youth, and vulnerable community members through charitable initiatives and direct assistance.",
    image: "/images/community-outreach.jpg",
  },
  {
    title: "Education and Youth Development",
    description: "Empowering young people through cultural education, leadership programs, and creative development opportunities.",
    image: "/images/youth-education.jpg",
  },
  {
    title: "Volunteer Program",
    description: "Engaging community members in meaningful service opportunities that create lasting positive impact.",
    image: "/images/volunteer-work.jpg",
  },
];

export function Programs() {
  return (
    <section id="programs" className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Our Programs
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            From cultural preservation to humanitarian service, our programs create meaningful impact
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group relative rounded overflow-hidden bg-card border border-gold/10 hover:border-gold/20 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 lg:p-8 -mt-16 z-10">
                <h3 className="font-heading text-xl lg:text-2xl text-gold mb-3 tracking-wide">
                  {program.title}
                </h3>
                <p className="text-cream/70 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div className="mt-20 text-center">
          <h3 className="font-heading text-2xl lg:text-3xl text-cream mb-6 tracking-wide">
            Events and Community Programs
          </h3>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto mb-8">
            Join us for cultural celebrations, educational workshops, community gatherings, and service events throughout the year.
          </p>
          <div className="inline-flex items-center gap-3 bg-card border border-gold/20 rounded px-8 py-4">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-cream/70">Upcoming Events To Be Announced</span>
          </div>
        </div>
      </div>
    </section>
  );
}
