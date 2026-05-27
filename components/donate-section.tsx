"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, BookOpen, Users, Globe, Lightbulb, Camera } from "lucide-react"

const impactAreas = [
  {
    icon: BookOpen,
    title: "Preserve Cultural Heritage",
    description: "Document and protect sacred traditions and oral histories",
  },
  {
    icon: Camera,
    title: "Document Sacred Traditions",
    description: "Create professional media archives of cultural practices",
  },
  {
    icon: Users,
    title: "Empower Communities",
    description: "Support local communities through education and resources",
  },
  {
    icon: Heart,
    title: "Humanitarian Outreach",
    description: "Provide aid and support to communities in need",
  },
  {
    icon: Lightbulb,
    title: "Inspire Future Generations",
    description: "Educate youth about their cultural heritage and identity",
  },
  {
    icon: Globe,
    title: "Global Cultural Preservation",
    description: "Share African wisdom and traditions with the world",
  },
]

export function DonateSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="donate" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Make a Difference
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
            Support Our Mission
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Your support helps us preserve cultural heritage, document sacred traditions, 
              empower communities, support humanitarian outreach, and inspire future generations 
              through media, education, and cultural preservation.
            </p>
          </div>
        </motion.div>

        {/* Impact Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {impactAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-card/30 border border-border/30 rounded-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <area.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Donation CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-primary/30 rounded-sm p-8 md:p-12 text-center glow-gold">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Contribution Matters
            </h3>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Every donation, regardless of size, helps us continue our vital work of 
              preserving African cultural heritage and supporting communities in need. 
              Together, we can illuminate culture and preserve heritage for generations to come.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg tracking-wide rounded-sm hover:bg-primary/90 transition-all duration-300 glow-gold animate-glow-pulse"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </a>
            <p className="mt-6 text-sm text-muted-foreground">
              Secure donation processing. All contributions are tax-deductible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
