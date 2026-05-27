export function FutureVision() {
  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-bronze rounded-full blur-[200px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Looking Ahead
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Future Expansion Vision
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Vision Content */}
        <div className="text-center mb-16">
          <p className="text-cream/80 text-lg lg:text-xl leading-relaxed mb-6 max-w-3xl mx-auto">
            As we grow, Ojú Imọlẹ Media Foundation envisions expanding our reach to serve communities across the Caribbean and throughout the diaspora. Our future plans include establishing cultural centers, developing comprehensive educational curricula, and building a global network of cultural preservation advocates.
          </p>
        </div>

        {/* Future Goals */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Cultural Archive Center",
              desc: "A dedicated facility for preserving and showcasing cultural artifacts, documents, and media",
              icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
            },
            {
              title: "International Partnerships",
              desc: "Collaborations with cultural organizations across the Caribbean, Africa, and global diaspora",
              icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Youth Leadership Academy",
              desc: "Comprehensive programs to develop the next generation of cultural leaders and media professionals",
              icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
            },
          ].map((goal) => (
            <div
              key={goal.title}
              className="bg-background/50 rounded p-8 border border-gold/10 hover:border-gold/20 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={goal.icon} />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-gold mb-3 tracking-wide">{goal.title}</h3>
              <p className="text-cream/60 leading-relaxed">{goal.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
