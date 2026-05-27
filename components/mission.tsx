import { BookOpen, Camera, Globe, Sparkles } from "lucide-react";

const missions = [
  {
    icon: BookOpen,
    title: "Cultural Education",
    description:
      "Developing educational programs that teach the history, significance, and practices of cultural traditions to new generations.",
  },
  {
    icon: Camera,
    title: "Documentation",
    description:
      "Creating high-quality films, photographs, and archives that preserve sacred ceremonies, rituals, and oral histories.",
  },
  {
    icon: Globe,
    title: "Global Connection",
    description:
      "Building bridges between communities across the diaspora, fostering understanding and unity through shared heritage.",
  },
  {
    icon: Sparkles,
    title: "Inspire Generations",
    description:
      "Inspiring future generations to embrace, celebrate, and continue the traditions of their ancestors.",
  },
];

export function Mission() {
  return (
    <section id="mission" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="text-gold text-sm tracking-[0.3em] uppercase">
              Our Purpose
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-cream mt-4 mb-6 tracking-wide text-balance">
              Mission and Vision
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-8">
              Our mission is to preserve, document, and celebrate cultural
              heritage through media excellence. We believe that every tradition
              holds wisdom, every story deserves to be told, and every community
              has the power to shape their narrative.
            </p>
            <p className="text-cream/70 text-lg leading-relaxed">
              We envision a world where cultural traditions thrive, where sacred
              knowledge is passed down through generations, and where media
              serves as a bridge connecting communities across time and space.
            </p>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {missions.map((mission) => (
              <div
                key={mission.title}
                className="bg-card border border-border rounded-lg p-6 hover:border-gold/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-bronze/20 flex items-center justify-center mb-4 group-hover:from-gold/30 group-hover:to-bronze/30 transition-colors">
                  <mission.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading text-lg text-cream mb-2 tracking-wide">
                  {mission.title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
