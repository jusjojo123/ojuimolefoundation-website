import Image from "next/image";

export function About() {
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
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Who We Are
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            About The Foundation
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded overflow-hidden">
              <Image
                src="/images/cultural-preservation.jpg"
                alt="Cultural preservation and heritage documentation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 rounded -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/30" />
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <p className="text-cream/80 text-lg lg:text-xl leading-relaxed">
              Ojú Imọlẹ Media Foundation is a Trinidad and Tobago based nonprofit cultural media foundation with an international vision rooted in Isese traditions, cultural preservation, media storytelling, education, youth empowerment, humanitarian outreach, and spiritual heritage documentation.
            </p>
            <p className="text-cream/70 text-base lg:text-lg leading-relaxed">
              Our name, meaning &ldquo;Eye of Light&rdquo; in the Yoruba language, embodies our commitment to illuminating culture, preserving sacred knowledge, and shining light on untold stories that deserve to be shared with the world.
            </p>
            <p className="text-cream/70 text-base lg:text-lg leading-relaxed">
              The foundation welcomes people of all backgrounds who genuinely support cultural awareness, education, humanitarian development, and the preservation of sacred traditions and community history.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/10 mt-8">
              <div className="text-center">
                <p className="font-heading text-2xl lg:text-3xl text-gold mb-1">2024</p>
                <p className="text-cream/40 text-xs tracking-wider uppercase">Founded</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl lg:text-3xl text-gold mb-1">T&T</p>
                <p className="text-cream/40 text-xs tracking-wider uppercase">Based</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl lg:text-3xl text-gold mb-1">Global</p>
                <p className="text-cream/40 text-xs tracking-wider uppercase">Vision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
