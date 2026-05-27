import Image from "next/image";

export function Media() {
  return (
    <section id="media" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Media and Documentary Projects
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Through cinematic storytelling, we preserve and share cultural heritage with the world
          </p>
        </div>

        {/* Featured Documentary Placeholder */}
        <div className="relative mb-16">
          <div className="relative aspect-video rounded overflow-hidden bg-muted border border-gold/10">
            <Image
              src="/images/documentary-filming.jpg"
              alt="Documentary filmmaking in progress"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            {/* Play Button Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-gold/50 flex items-center justify-center mx-auto mb-4 hover:border-gold transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gold/70 text-sm tracking-wider">Documentary Clip To Be Added</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
            <span className="text-gold/70 text-sm tracking-wider uppercase">Featured Project</span>
            <h3 className="font-heading text-2xl lg:text-3xl text-cream mt-2">Cultural Heritage Documentary Series</h3>
          </div>
        </div>

        {/* Project Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Documentary Films", desc: "Long-form cultural documentaries", icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" },
            { title: "Interview Series", desc: "Conversations with elders and leaders", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
            { title: "Photo Archives", desc: "Visual heritage documentation", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
            { title: "Audio Archives", desc: "Oral history recordings", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
          ].map((category) => (
            <div
              key={category.title}
              className="bg-background/50 rounded p-6 border border-gold/10 hover:border-gold/20 transition-colors group text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                </svg>
              </div>
              <h4 className="text-cream font-medium mb-2">{category.title}</h4>
              <p className="text-cream/50 text-sm">{category.desc}</p>
            </div>
          ))}
        </div>

        {/* Articles Section */}
        <div className="mt-20">
          <h3 className="font-heading text-2xl text-cream text-center mb-10 tracking-wide">
            Articles and News
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-background/50 rounded overflow-hidden border border-gold/10 hover:border-gold/20 transition-colors group"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-cream/30 text-sm tracking-wider">Image To Be Added</p>
                </div>
                <div className="p-6">
                  <span className="text-gold/60 text-xs tracking-wider uppercase">Coming Soon</span>
                  <h4 className="text-cream font-medium mt-2 mb-2">Article Title Placeholder</h4>
                  <p className="text-cream/50 text-sm">Article content and stories will be featured here.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
