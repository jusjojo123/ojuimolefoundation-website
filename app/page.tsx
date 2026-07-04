import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { FounderMessage } from "@/components/founder-message";
import { Leadership } from "@/components/leadership";
import { Programs } from "@/components/programs";
import { SpiritualHeritage } from "@/components/spiritual-heritage";
import { HonoringElders } from "@/components/honoring-elders";
import { Media } from "@/components/media";
import { Interviews } from "@/components/interviews";
import { Gallery } from "@/components/gallery";
import { CommunityProjects } from "@/components/community-projects";
import { Events } from "@/components/events";
import { Announcements } from "@/components/announcements";
import { FutureVision } from "@/components/future-vision";
import { Donate } from "@/components/donate";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Mission />
      <FounderMessage />
      <Leadership />
      <Programs />
      <SpiritualHeritage />
      <HonoringElders />
      <Media />
      <Interviews />
      <Gallery />
      <CommunityProjects />
      <Events />
      <Announcements />
      <FutureVision />
      <Donate />
      <Contact />
      <Footer />
    </main>
  );
}
