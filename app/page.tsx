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
import { Gallery } from "@/components/gallery";
import { FutureVision } from "@/components/future-vision";
import { Donate } from "@/components/donate";
import { Contact } from "@/components/contact";
import { NewsletterSignup } from "@/components/public/newsletter-signup";
import { Footer } from "@/components/footer";
import { EditRoot } from "@/components/edit/edit-root";

// CMS-driven content is invalidated on-demand via revalidatePath("/") in the
// edit/leadership actions; this interval is a safety net so edits always
// appear within a minute even if an on-demand revalidation is missed.
export const revalidate = 60;

export default function Home() {
  return (
    <EditRoot>
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
        <Gallery />
        <FutureVision />
        <Donate />
        <Contact />
        <NewsletterSignup />
        <Footer />
      </main>
    </EditRoot>
  );
}
