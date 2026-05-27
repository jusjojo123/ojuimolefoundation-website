import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sacred-flames.jpg"
          alt="Sacred terracotta bowls with palm oil flames and Ifá ikins in circular formation"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      {/* Subtle Gold Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
            <Image
              src="/images/logo.png"
              alt="Ojú Imọlẹ Media Foundation"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(201,162,39,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Foundation Name */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cream tracking-wider mb-3">
          <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            Ojú Imọlẹ
          </span>
        </h1>
        <p className="text-cream/50 text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase mb-2">
          Media Foundation
        </p>
        <p className="text-gold/70 text-sm md:text-base tracking-widest italic mb-12">
          Eye of Light
        </p>

        {/* Main Slogan */}
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cream mb-4 tracking-wide text-balance leading-relaxed">
          Honoring Our Past, Inspiring Our Future
        </h2>

        {/* Secondary Slogan */}
        <p className="text-cream/60 text-base sm:text-lg md:text-xl tracking-wide mb-14 text-pretty">
          Rooted in Vision, Rising in Purpose
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="#about"
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-gold to-amber text-background font-heading text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-all duration-300 rounded"
          >
            Discover Our Mission
          </Link>
          <Link
            href="#donate"
            className="w-full sm:w-auto px-10 py-4 border border-gold/40 text-gold font-heading text-sm tracking-[0.2em] uppercase hover:bg-gold/10 hover:border-gold/70 transition-all duration-300 rounded"
          >
            Support Our Work
          </Link>
        </div>

        {/* Location Badge */}
        <div className="mt-20 inline-flex items-center gap-3 text-cream/40 text-sm tracking-wider">
          <svg className="w-4 h-4 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Founded in 2025 in Trinidad and Tobago, West Indies</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
