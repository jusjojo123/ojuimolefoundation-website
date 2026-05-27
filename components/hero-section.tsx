"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/sacred-ritual.jpg"
          alt="Sacred ritual with terracotta bowls and flames"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Warm Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-2xl animate-flicker" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-bronze/10 rounded-full blur-3xl animate-flicker" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Large Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 mx-auto relative">
            <Image
              src="/images/logo.png"
              alt="Ojú Imọlẹ Media Foundation Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10 animate-glow-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider mb-4">
            <span className="text-gradient-gold">OJÚ IMỌLẸ</span>
          </h1>
          <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl md:text-2xl text-primary/80 tracking-[0.3em] uppercase mb-2">
            Media Foundation
          </p>
          <p className="text-sm sm:text-base text-muted-foreground tracking-widest uppercase mb-8">
            Eye of Light
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl text-foreground/90 italic tracking-wide">
            Illuminating Culture. Preserving Heritage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#about"
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold tracking-wide rounded-sm hover:bg-primary/90 transition-all duration-300 glow-gold"
          >
            Discover Our Mission
          </a>
          <a
            href="#donate"
            className="px-8 py-4 border border-primary text-primary font-semibold tracking-wide rounded-sm hover:bg-primary/10 transition-all duration-300"
          >
            Support Us
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
