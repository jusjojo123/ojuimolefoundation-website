import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#mission", label: "Mission" },
  { href: "#leadership", label: "Leadership" },
  { href: "#programs", label: "Programs" },
  { href: "#media", label: "Media" },
  { href: "#donate", label: "Donate" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/OjuImoleMedia" },
  { name: "TikTok", href: "https://tiktok.com/@ojuimolemedia" },
  { name: "Instagram", href: "https://instagram.com/ojuimolemedia" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14">
                <Image
                  src="/images/logo.png"
                  alt="Ojú Imọlẹ Media Foundation"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-heading text-gold text-lg tracking-wider block">
                  Ojú Imọlẹ
                </span>
                <span className="text-cream/50 text-xs tracking-widest uppercase">
                  Media Foundation
                </span>
              </div>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed mb-4">
              Eye of Light. Preserving cultural heritage and sacred traditions through media excellence.
            </p>
            <p className="text-gold/60 text-sm italic">
              Honoring Our Past, Inspiring Our Future
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-cream text-lg mb-6 tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream/50 hover:text-gold transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-cream text-lg mb-6 tracking-wide">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:ojuimolefoundation@gmail.com"
                className="text-cream/50 hover:text-gold transition-colors"
              >
                ojuimolefoundation@gmail.com
              </a>
              <a
                href="tel:+18682542540"
                className="text-cream/50 hover:text-gold transition-colors"
              >
                +1 (868) 254-2540
              </a>
              <span className="text-cream/50">6th Company Village, New Grant</span>
              <span className="text-cream/50">Trinidad and Tobago</span>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-cream text-lg mb-6 tracking-wide">Follow Us</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/50 hover:text-gold transition-colors text-sm"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-cream/40">
              © {currentYear} Ojú Imọlẹ Media Foundation. All rights reserved.
            </p>
            <p className="text-cream/40">
              Founded in 2025 in Trinidad and Tobago
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
