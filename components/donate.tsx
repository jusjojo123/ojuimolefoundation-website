import Link from "next/link";
import { Heart, CheckCircle } from "lucide-react";

const impactAreas = [
  "Preserve cultural heritage",
  "Document sacred traditions",
  "Empower communities",
  "Support humanitarian outreach",
  "Inspire future generations",
];

export function Donate() {
  return (
    <section
      id="donate"
      className="py-24 md:py-32 bg-gradient-to-b from-card to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold/30">
            <Heart className="w-10 h-10 text-background" />
          </div>

          {/* Title */}
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Make a Difference
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mt-4 mb-6 tracking-wide">
            Support Our Mission
          </h2>

          {/* Description */}
          <p className="text-cream/70 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            Your support helps us preserve cultural heritage, document sacred
            traditions, empower communities, support humanitarian outreach, and
            inspire future generations through media, education, and cultural
            preservation.
          </p>

          {/* Impact List */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {impactAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2"
              >
                <CheckCircle className="w-4 h-4 text-gold" />
                <span className="text-cream/80 text-sm">{area}</span>
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <Link
            href="mailto:ojuimolefoundation@gmail.com?subject=Donation%20Inquiry"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-bronze text-background px-10 py-5 rounded-md font-heading text-xl font-semibold hover:opacity-90 transition-opacity tracking-wide shadow-lg shadow-gold/30 hover:shadow-gold/50"
          >
            <Heart className="w-6 h-6" />
            Donate Now
          </Link>

          {/* Contact Info */}
          <p className="text-cream/50 text-sm mt-8">
            For donation inquiries, contact us at{" "}
            <a
              href="mailto:ojuimolefoundation@gmail.com"
              className="text-gold hover:underline"
            >
              ojuimolefoundation@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
