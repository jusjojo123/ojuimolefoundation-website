import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { MissionSection } from "@/components/mission-section"
import { GallerySection } from "@/components/gallery-section"
import { DonateSection } from "@/components/donate-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <GallerySection />
      <DonateSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
