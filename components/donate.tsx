import Link from "next/link";

export function Donate() {
  return (
    <section id="donate" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(201,162,39,0.3)]">
            <svg className="w-10 h-10 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          {/* Title */}
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Make a Difference
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Support Our Mission
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

          {/* Description */}
          <p className="text-cream/70 text-lg lg:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            Your support helps us preserve cultural heritage, document sacred traditions, empower communities, support humanitarian outreach, and inspire future generations through media, education, and cultural preservation.
          </p>

          {/* Impact Areas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {[
              "Preserve cultural heritage",
              "Document sacred traditions",
              "Empower communities",
              "Support humanitarian outreach",
              "Inspire future generations",
            ].map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 bg-card border border-gold/10 rounded px-4 py-3 justify-center"
              >
                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-cream/70 text-sm">{area}</span>
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <Link
            href="mailto:ojuimolefoundation@gmail.com?subject=Donation%20Inquiry"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-amber text-background px-12 py-5 rounded font-heading text-lg tracking-[0.15em] uppercase hover:shadow-[0_0_40px_rgba(201,162,39,0.4)] transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Donate Now
          </Link>

          {/* Contact Info */}
          <p className="text-cream/40 text-sm mt-8">
            For donation inquiries, contact us at{" "}
            <a href="mailto:ojuimolefoundation@gmail.com" className="text-gold/70 hover:text-gold transition-colors">
              ojuimolefoundation@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
