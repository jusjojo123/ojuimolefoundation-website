import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold via-bronze to-earth flex items-center justify-center">
                <span className="font-heading text-background text-xl font-bold">
                  OI
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-gold text-lg tracking-wider">
                  Ojú Imọlẹ
                </span>
                <span className="text-cream/70 text-xs tracking-widest uppercase">
                  Media Foundation
                </span>
              </div>
            </Link>
            <p className="text-cream/60 leading-relaxed">
              Eye of Light. Preserving cultural heritage and sacred traditions
              through media excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-cream text-lg mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="#about"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#mission"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                Our Mission
              </Link>
              <Link
                href="#donate"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                Support Us
              </Link>
              <Link
                href="#contact"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-cream text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-cream/60">
              <a
                href="mailto:ojuimolefoundation@gmail.com"
                className="hover:text-gold transition-colors"
              >
                ojuimolefoundation@gmail.com
              </a>
              <a
                href="tel:+18682542540"
                className="hover:text-gold transition-colors"
              >
                +1 (868) 254-2540
              </a>
              <span>Trinidad and Tobago, West Indies</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-sm">
            {currentYear} Ojú Imọlẹ Media Foundation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://facebook.com/OjuImoleMedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-gold transition-colors text-sm"
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com/@ojuimolemedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-gold transition-colors text-sm"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
