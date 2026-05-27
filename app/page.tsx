import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { FounderMessage } from "@/components/founder-message";
import { Leadership } from "@/components/leadership";
import { Programs } from "@/components/programs";
import { Media } from "@/components/media";
import { Gallery } from "@/components/gallery";
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
      <Media />
      <Gallery />
      <FutureVision />
      <Donate />
      <Contact />
      <Footer />
    </main>
  );
}
