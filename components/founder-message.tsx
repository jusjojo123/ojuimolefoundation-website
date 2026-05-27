import Image from "next/image";

export function FounderMessage() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold rounded-full blur-[200px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Section Header */}
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            From Our Founder
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            A Message of Purpose
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12" />

          {/* Photo Placeholder */}
          <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-8 rounded-full overflow-hidden border-2 border-gold/30 bg-card flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gold/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-cream/30 text-[10px] tracking-wider">Leadership Photo<br />To Be Added</p>
            </div>
          </div>

          {/* Quote */}
          <div className="max-w-3xl mx-auto">
            <svg className="w-10 h-10 text-gold/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-cream/80 text-lg lg:text-xl leading-relaxed mb-6 italic">
              Our foundation was born from a deep reverence for cultural heritage and a burning desire to preserve the sacred traditions that connect us to our ancestors. Every story we document, every community we serve, and every young person we inspire brings us closer to fulfilling our mission of illuminating culture and empowering generations.
            </p>
            <p className="text-cream/70 text-base lg:text-lg leading-relaxed mb-8">
              In Trinidad and Tobago, we have witnessed the beauty of diverse traditions coming together. It is this spirit of unity and cultural pride that drives our work. Through media, education, and humanitarian service, we are building bridges between the past and the future.
            </p>
          </div>

          {/* Founder Info */}
          <div className="border-t border-gold/10 pt-6 inline-block">
            <p className="font-heading text-xl text-gold tracking-wide">Jolene Smart</p>
            <p className="text-cream/50 text-sm tracking-wider">Founder and Executive Director</p>
          </div>
        </div>
      </div>
    </section>
  );
}
