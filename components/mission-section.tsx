"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="mission" className="py-24 md:py-32 relative overflow-hidden bg-card/30">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden">
              <Image
                src="/images/sacred-ritual.jpg"
                alt="Sacred terracotta bowls with Ifá ikins"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -inset-4 border border-primary/20 rounded-sm -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
              Our Purpose
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-8">
              Our Mission
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Ojú Imọlẹ Media Foundation is committed to preserving cultural heritage, 
                spiritual wisdom, oral traditions, and community stories through media, 
                documentation, education, humanitarian outreach, and global cultural archiving.
              </p>

              <p className="text-foreground/70 leading-relaxed">
                Rooted in Isese traditions and guided by the vision of unity, empowerment, 
                and enlightenment, the foundation exists to honor ancestral knowledge, 
                uplift communities, inspire future generations, and create lasting impact 
                through storytelling, creativity, service, and cultural preservation.
              </p>

              <div className="pt-6 border-t border-border/50">
                <blockquote className="font-[family-name:var(--font-display)] text-2xl text-primary italic">
                  &ldquo;Illuminating Culture. Preserving Heritage.&rdquo;
                </blockquote>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <a
                href="#donate"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold tracking-wide rounded-sm hover:bg-primary/90 transition-all duration-300 glow-gold"
              >
                Join Our Mission
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
