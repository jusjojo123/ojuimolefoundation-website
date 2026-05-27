import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ojuimolefoundation@gmail.com",
    href: "mailto:ojuimolefoundation@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (868) 254-2540",
    href: "tel:+18682542540",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Trinidad and Tobago, West Indies",
    href: null,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/OjuImoleMedia",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@ojuimolemedia",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Get in Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mt-4 mb-6 tracking-wide">
            Contact Us
          </h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            We would love to hear from you. Reach out to learn more about our
            work or discuss partnership opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="bg-background/50 border border-border rounded-lg p-8 text-center hover:border-gold/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-bronze/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-lg text-cream mb-2">
                {item.label}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-cream/70">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="font-heading text-xl text-cream mb-6">Follow Us</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold/30 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
