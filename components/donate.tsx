import { getSiteContentMap, resolve } from "@/lib/site-content";
import { EditableText } from "@/components/edit/editable-text";

export async function Donate() {
  const c = await getSiteContentMap();
  const donateEmail = resolve(c, "donate.email", "ojuimolefoundation@gmail.com");
  const areas = [
    "donate.area.1",
    "donate.area.2",
    "donate.area.3",
    "donate.area.4",
    "donate.area.5",
  ];
  const areaDefaults: Record<string, string> = {
    "donate.area.1": "Preserve cultural heritage",
    "donate.area.2": "Document sacred traditions",
    "donate.area.3": "Empower communities",
    "donate.area.4": "Support humanitarian outreach",
    "donate.area.5": "Inspire future generations",
  };

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
          <EditableText
            contentKey="donate.eyebrow"
            as="span"
            label="Eyebrow"
            className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block"
            value={resolve(c, "donate.eyebrow", "Make a Difference")}
          />
          <EditableText
            contentKey="donate.title"
            as="h2"
            label="Heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6"
            value={resolve(c, "donate.title", "Support Our Mission")}
          />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

          {/* Description */}
          <EditableText
            contentKey="donate.body"
            as="p"
            label="Description"
            multiline
            className="text-cream/70 text-lg lg:text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
            value={resolve(
              c,
              "donate.body",
              "Your support helps us preserve cultural heritage, document sacred traditions, empower communities, support humanitarian outreach, and inspire future generations through media, education, and cultural preservation.",
            )}
          />

          {/* Impact Areas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {areas.map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 bg-card border border-gold/10 rounded px-4 py-3 justify-center"
              >
                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <EditableText
                  contentKey={key}
                  as="span"
                  label="Impact area"
                  className="text-cream/70 text-sm"
                  value={resolve(c, key, areaDefaults[key])}
                />
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <a
            href={`mailto:${donateEmail}?subject=Donation%20Inquiry`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-amber text-background px-12 py-5 rounded font-heading text-lg tracking-[0.15em] uppercase hover:shadow-[0_0_40px_rgba(201,162,39,0.4)] transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <EditableText
              contentKey="donate.buttonLabel"
              as="span"
              label="Button label"
              value={resolve(c, "donate.buttonLabel", "Donate Now")}
            />
          </a>

          {/* Contact Info */}
          <p className="text-cream/40 text-sm mt-8">
            For donation inquiries, contact us at{" "}
            <EditableText
              contentKey="donate.email"
              as="span"
              label="Donation email"
              className="text-gold/70"
              value={donateEmail}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
