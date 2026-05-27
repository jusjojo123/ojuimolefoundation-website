import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/sacred-flames.jpg"
          alt="Sacred terracotta bowls with warm flames in circular formation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        <div className="mb-6">
          <span className="text-gold text-sm md:text-base tracking-[0.3em] uppercase">
            Eye of Light
          </span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-wide text-balance">
          Ojú Imọlẹ
          <span className="block text-gold">Media Foundation</span>
        </h1>

        <p className="text-cream/80 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
          Preserving cultural heritage, documenting sacred traditions, and
          empowering communities through media, education, and cultural
          preservation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#about"
            className="bg-gradient-to-r from-gold to-bronze text-background px-8 py-4 rounded-md font-semibold text-lg hover:opacity-90 transition-opacity tracking-wide"
          >
            Discover Our Mission
          </Link>
          <Link
            href="#donate"
            className="border-2 border-gold text-gold px-8 py-4 rounded-md font-semibold text-lg hover:bg-gold/10 transition-colors tracking-wide"
          >
            Support Our Work
          </Link>
        </div>

        {/* Location Badge */}
        <div className="mt-16">
          <span className="text-cream/60 text-sm tracking-widest uppercase">
            Based in Trinidad and Tobago, West Indies
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </div>
      </div>
    </section>
  );
}
