import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Big Logo */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Cultural gathering at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 text-center">
          {/* Big Logo */}
          <div className="mb-8 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] relative">
            <Image
              src="/images/logo.png"
              alt="Ojú Imọlẹ Media Foundation - The Eye of Light"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Tagline */}
          <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-foreground/90 font-sans leading-relaxed mb-10">
            Illuminating stories, preserving heritage, empowering communities through
            the power of media and cultural documentation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#about"
              className="px-8 py-4 bg-primary text-primary-foreground font-serif text-lg tracking-wide hover:bg-accent transition-colors rounded"
            >
              Discover Our Mission
            </Link>
            <Link
              href="#programs"
              className="px-8 py-4 border-2 border-primary text-primary font-serif text-lg tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors rounded"
            >
              Our Programs
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary text-center mb-12">
            About The Foundation
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Ojú Imọlẹ Media Foundation, meaning &quot;The Eye of Light&quot; in Yoruba, is a
                Trinidad and Tobago based nonprofit cultural media organization with an
                international vision.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Rooted in Isese traditions, we are dedicated to cultural preservation,
                media storytelling, humanitarian outreach, education, youth empowerment,
                and spiritual heritage documentation.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Our mission is to illuminate the rich tapestry of African diaspora
                cultures while building bridges between communities across the globe.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
                <Image
                  src="/images/logo.png"
                  alt="Ojú Imọlẹ Foundation Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary text-center mb-12">
            Our Programs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-secondary p-8 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 mb-4 text-primary">{program.icon}</div>
                <h3 className="text-xl font-serif text-primary mb-3">{program.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary mb-8">
            Connect With Us
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed mb-10">
            Join us in our mission to preserve and celebrate cultural heritage.
            Together, we can illuminate the stories that matter.
          </p>
          <a
            href="mailto:info@ojuimolemedia.org"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-serif text-lg tracking-wide hover:bg-accent transition-colors rounded"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Ojú Imọlẹ Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-serif text-primary">Ojú Imọlẹ Media Foundation</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Ojú Imọlẹ Media Foundation. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

const programs = [
  {
    title: "Cultural Documentation",
    description:
      "Preserving and archiving traditional practices, oral histories, and spiritual ceremonies for future generations.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Media Production",
    description:
      "Creating compelling documentaries, films, and digital content that share authentic stories of African diaspora communities.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Youth Empowerment",
    description:
      "Inspiring and educating young people about their cultural heritage while developing their creative and leadership skills.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Humanitarian Outreach",
    description:
      "Supporting communities through educational initiatives, health programs, and sustainable development projects.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "Educational Programs",
    description:
      "Offering workshops, seminars, and courses on cultural traditions, media production, and heritage preservation.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    ),
  },
  {
    title: "Heritage Events",
    description:
      "Organizing cultural festivals, exhibitions, and community gatherings that celebrate and share our rich traditions.",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];
