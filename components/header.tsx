"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#mission", label: "Mission" },
  { href: "#donate", label: "Donate" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gold via-bronze to-earth flex items-center justify-center shadow-lg shadow-gold/20 group-hover:shadow-gold/40 transition-shadow">
              <span className="font-heading text-background text-xl md:text-3xl font-bold">
                OI
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-gold text-lg md:text-2xl tracking-wider">
                Ojú Imọlẹ
              </span>
              <span className="text-cream/70 text-xs md:text-sm tracking-widest uppercase">
                Media Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/80 hover:text-gold transition-colors text-lg tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#donate"
              className="bg-gradient-to-r from-gold to-bronze text-background px-6 py-2.5 rounded-md font-semibold hover:opacity-90 transition-opacity tracking-wide"
            >
              Support Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-cream p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-cream/80 hover:text-gold transition-colors text-lg tracking-wide py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#donate"
              onClick={() => setIsMenuOpen(false)}
              className="bg-gradient-to-r from-gold to-bronze text-background px-6 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity tracking-wide mt-2"
            >
              Support Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
