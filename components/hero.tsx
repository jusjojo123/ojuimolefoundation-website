import Image from "next/image";
import { getSiteContentMap, resolve } from "@/lib/site-content";
import { EditableText } from "@/components/edit/editable-text";
import { EditableImage } from "@/components/edit/editable-image";
import { EditableLink } from "@/components/edit/editable-link";

export async function Hero() {
  const c = await getSiteContentMap();

  const bg = resolve(c, "hero.bgImage", "/images/hero-sacred-flames.jpg");
  const logo = resolve(c, "hero.logo", "/images/logo.png");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <EditableImage contentKey="hero.bgImage" className="absolute inset-0" label="Change background">
        <Image
          src={bg || "/placeholder.svg"}
          alt="Sacred terracotta bowls with palm oil flames and Ifá ikins in circular formation"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </EditableImage>

      {/* Subtle Gold Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <EditableImage
            contentKey="hero.logo"
            label="Change logo"
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
          >
            <Image
              src={logo || "/placeholder.svg"}
              alt="Ojú Imọ̀lẹ̀ Media Foundation"
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(201,162,39,0.3)]"
              priority
            />
          </EditableImage>
        </div>

        {/* Foundation Name */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cream tracking-wider mb-3">
          <EditableText
            contentKey="hero.name"
            as="span"
            label="Foundation name"
            value={resolve(c, "hero.name", "Ojú Imọ̀lẹ̀")}
            className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent"
          />
        </h1>
        <EditableText
          contentKey="hero.subtitle"
          as="p"
          label="Subtitle"
          value={resolve(c, "hero.subtitle", "Media Foundation")}
          className="text-cream/50 text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase mb-2"
        />
        <EditableText
          contentKey="hero.tagline"
          as="p"
          label="Tagline"
          value={resolve(c, "hero.tagline", "Eye of Light")}
          className="text-gold/70 text-sm md:text-base tracking-widest italic mb-12"
        />

        {/* Main Slogan */}
        <EditableText
          contentKey="hero.slogan"
          as="h2"
          label="Main slogan"
          value={resolve(c, "hero.slogan", "Honoring Our Past, Inspiring Our Future")}
          className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cream mb-4 tracking-wide text-balance leading-relaxed"
        />

        {/* Secondary Slogan */}
        <EditableText
          contentKey="hero.secondarySlogan"
          as="p"
          label="Secondary slogan"
          value={resolve(c, "hero.secondarySlogan", "Rooted in Vision, Rising in Purpose")}
          className="text-cream/60 text-base sm:text-lg md:text-xl tracking-wide mb-14 text-pretty"
        />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <EditableLink
            labelKey="hero.ctaPrimary.label"
            hrefKey="hero.ctaPrimary.href"
            label={resolve(c, "hero.ctaPrimary.label", "Discover Our Mission")}
            href={resolve(c, "hero.ctaPrimary.href", "#about")}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-gold to-amber text-background font-heading text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-all duration-300 rounded"
          />
          <EditableLink
            labelKey="hero.ctaSecondary.label"
            hrefKey="hero.ctaSecondary.href"
            label={resolve(c, "hero.ctaSecondary.label", "Support Our Work")}
            href={resolve(c, "hero.ctaSecondary.href", "#donate")}
            className="w-full sm:w-auto px-10 py-4 border border-gold/40 text-gold font-heading text-sm tracking-[0.2em] uppercase hover:bg-gold/10 hover:border-gold/70 transition-all duration-300 rounded"
          />
        </div>

        {/* Location Badge */}
        <div className="mt-20 inline-flex items-center gap-3 text-cream/40 text-sm tracking-wider">
          <svg className="w-4 h-4 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <EditableText
            contentKey="hero.location"
            as="span"
            label="Location badge"
            value={resolve(c, "hero.location", "Founded in 2025 in Trinidad and Tobago, West Indies")}
          />
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
