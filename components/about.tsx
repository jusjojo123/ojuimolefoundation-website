import { Eye, Film, Users, Heart } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Eye of Light",
    description:
      "Ojú Imọlẹ, meaning Eye of Light, illuminates the path to cultural understanding and spiritual connection through visual storytelling.",
  },
  {
    icon: Film,
    title: "Media Preservation",
    description:
      "We document and preserve sacred traditions, oral histories, and cultural practices through professional film, photography, and digital media.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "Empowering communities by providing resources, education, and platforms to share their stories and preserve their heritage.",
  },
  {
    icon: Heart,
    title: "Humanitarian Outreach",
    description:
      "Supporting humanitarian initiatives that uplift communities and create lasting positive impact through cultural connection.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Who We Are
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mt-4 mb-6 tracking-wide">
            About the Foundation
          </h2>
          <p className="text-cream/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Founded in Trinidad and Tobago, Ojú Imọlẹ Media Foundation is
            dedicated to preserving and celebrating cultural heritage through
            the power of media. Our name, meaning Eye of Light, reflects our
            commitment to illuminating traditions that connect us to our roots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background/50 border border-border rounded-lg p-8 md:p-10 hover:border-gold/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-bronze/20 flex items-center justify-center mb-6 group-hover:from-gold/30 group-hover:to-bronze/30 transition-colors">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-cream mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-cream/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
