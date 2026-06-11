import Image from "next/image";

const elderFeatures = [
  {
    title: "Community Wisdom Gathering",
    description: "Elders and community members united in traditional ceremony",
    image: "/images/elders-community.jpg",
  },
  {
    title: "Elder Interview Coming Soon",
    description: "Documenting wisdom from community elders",
    image: "/images/elder-interview.jpg",
  },
  {
    title: "Cultural Archive Documentation",
    description: "Preserving oral traditions for future generations",
    image: "/images/elder-storytelling.jpg",
  },
  {
    title: "Community Wisdom Series",
    description: "Traditional drumming and ceremonial gatherings",
    image: "/images/elder-drumming.jpg",
  },
  {
    title: "Voices of Heritage",
    description: "Intergenerational knowledge transfer",
    image: "/images/elder-teaching.jpg",
  },
  {
    title: "Traditional Knowledge Preservation",
    description: "Sacred traditions and community blessings",
    image: "/images/elder-blessing.jpg",
  },
];

const placeholders = [
  "Elder Portrait Coming Soon",
  "Oral History Archive",
  "Sacred Traditions Documentation",
];

export function HonoringElders() {
  return (
    <section id="elders" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Warm ambient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Preserving Heritage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Honoring Our Elders
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
          <p className="text-cream/70 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            We believe the wisdom of our elders carries the light of history, culture, spirituality, and community memory. Through storytelling, documentation, and preservation, we honor the voices that continue to guide future generations.
          </p>
        </div>

        {/* Main Elder Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {elderFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden bg-muted border border-gold/10 hover:border-gold/30 transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Warm overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                {/* Gold accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-lg text-cream mb-2 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-cream/60 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder Cards for Future Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {placeholders.map((placeholder, index) => (
            <div
              key={index}
              className="relative aspect-[3/2] rounded-lg overflow-hidden bg-muted/50 border border-gold/10 hover:border-gold/20 transition-colors group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg className="w-12 h-12 text-gold/20 mx-auto mb-4 group-hover:text-gold/30 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-cream/40 text-sm tracking-wider">{placeholder}</p>
                  <p className="text-cream/20 text-xs mt-2">Coming Soon</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <div className="w-16 h-px bg-gold/30 mx-auto mb-8" />
          <p className="text-cream/60 text-base lg:text-lg italic max-w-2xl mx-auto">
            &ldquo;The wisdom of our ancestors is not meant to be locked away, but to flow through generations like a river of light, nourishing all who seek its guidance.&rdquo;
          </p>
          <div className="w-16 h-px bg-gold/30 mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
}
