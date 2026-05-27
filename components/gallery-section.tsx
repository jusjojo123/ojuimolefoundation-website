"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="gallery" className="py-24 md:py-32 relative overflow-hidden bg-card/30">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Visual Stories
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
            Sacred Traditions
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Glimpses into the sacred rituals, traditions, and cultural practices we document and preserve.
          </p>
        </motion.div>

        {/* Main Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[21/9] rounded-sm overflow-hidden mb-8"
        >
          <Image
            src="/images/sacred-ritual.jpg"
            alt="Sacred ritual with terracotta bowls and Ifá ikins"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-foreground mb-2">
              Sacred Ifá Ceremony
            </h3>
            <p className="text-foreground/70">
              Traditional terracotta bowls with palm oil flames and sacred Ifá ikins
            </p>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              className="group relative aspect-square rounded-sm overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
              <Image
                src="/images/sacred-ritual.jpg"
                alt={`Gallery image ${item}`}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm text-foreground/90">
                  {index === 0 && "Preserving ancestral wisdom"}
                  {index === 1 && "Documenting sacred traditions"}
                  {index === 2 && "Illuminating cultural heritage"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
