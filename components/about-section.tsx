"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Eye, BookOpen, Users, Globe } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Cultural Preservation",
    description:
      "Documenting and safeguarding sacred traditions, oral histories, and ancestral knowledge for future generations.",
  },
  {
    icon: BookOpen,
    title: "Education & Media",
    description:
      "Creating powerful storytelling through film, photography, and digital media to share cultural wisdom globally.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "Uplifting communities through humanitarian outreach, cultural programs, and sustainable development initiatives.",
  },
  {
    icon: Globe,
    title: "Global Archiving",
    description:
      "Building a comprehensive digital archive to preserve and share African spiritual and cultural heritage worldwide.",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-bronze/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Who We Are
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-6">
            About the Foundation
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Rooted in Isese traditions and guided by the vision of unity, empowerment, 
              and enlightenment, Ojú Imọlẹ Media Foundation exists to honor ancestral knowledge, 
              uplift communities, inspire future generations, and create lasting impact through 
              storytelling, creativity, service, and cultural preservation.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-card/50 border border-border/50 rounded-sm p-8 h-full hover:border-primary/50 transition-all duration-500 hover:glow-gold">
                <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto leading-relaxed">
            The foundation welcomes people of all backgrounds who genuinely support 
            cultural awareness, education, humanitarian development, and the preservation 
            of sacred traditions and community history.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
