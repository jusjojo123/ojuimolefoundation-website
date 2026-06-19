"use client";

import Image from "next/image";

export function SpiritualHeritage() {
  return (
    <section id="spiritual-heritage" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">Rooted in Tradition</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
            Spiritual Heritage
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
          <p className="text-cream/70 text-lg max-w-3xl mx-auto leading-relaxed">
            Ojú Imọlẹ Media Foundation honors and documents the sacred traditions of Ifá and Isese, 
            preserving ancestral wisdom for future generations through education, media, and community engagement.
          </p>
        </div>

        {/* About Ifá Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <p className="text-gold/60 text-sm tracking-[0.2em] uppercase mb-3">The Sacred Tradition</p>
            <h3 className="font-heading text-2xl md:text-3xl text-cream mb-6">
              Understanding Ifá
            </h3>
            <div className="space-y-4 text-cream/70 leading-relaxed">
              <p>
                Ifá is an ancient system of divination and spiritual philosophy originating from the Yorùbá people. 
                It encompasses a vast body of wisdom, poetry, and teachings known as Odù Ifá, which provides guidance 
                on ethics, morality, history, and the nature of existence.
              </p>
              <p>
                At its core, Ifá teaches the importance of developing good character (ìwà rere), living in harmony 
                with nature, honoring ancestors, and maintaining balance between the spiritual and physical worlds. 
                The tradition emphasizes personal responsibility, community welfare, and the pursuit of wisdom.
              </p>
              <p>
                Through Ifá, practitioners seek guidance from Ọ̀rúnmìlà, the deity of wisdom and divination, 
                to navigate life&apos;s challenges by aligning with their inner consciousness (orí) to fulfill their destiny (àyànmọ́).
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gold/20">
              <Image
                src="/images/ifa-divination-items.jpg"
                alt="Sacred Ifá divination items including ikin palm nuts and ceremonial objects"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Isese Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gold/20">
              <Image
                src="/images/obatala-sacred-items.jpg"
                alt="Sacred Obatala items including white eleke beads, ceremonial vessels, and sacred objects"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
          <div>
            <p className="text-gold/60 text-sm tracking-[0.2em] uppercase mb-3">Living Tradition</p>
            <h3 className="font-heading text-2xl md:text-3xl text-cream mb-6">
              Isese: The Original Way
            </h3>
            <div className="space-y-4 text-cream/70 leading-relaxed">
              <p>
                Isese (meaning &quot;the source&quot; or &quot;the original way&quot;) refers to the traditional and cultural 
                practices of the Isese community. It encompasses the study, practice, and wisdom of Ifá, alignment with the Òrìṣà (deities), 
                veneration of ancestors, and adherence to ancient customs that have been passed down through generations.
              </p>
              <p>
                In Trinidad and Tobago and throughout the Caribbean diaspora, Isese traditions have been preserved 
                and adapted, creating vibrant communities that maintain connections to their African ancestral roots 
                while developing unique expressions of the tradition.
              </p>
              <p>
                Isese practitioners gather for ceremonies, festivals, educational programs, and community celebrations that honor ancestral traditions, 
                celebrate life passages, strengthen community bonds, and preserve sacred cultural knowledge through shared spiritual and cultural practices.
              </p>
            </div>
          </div>
        </div>

        {/* Core Teachings */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-gold/60 text-sm tracking-[0.2em] uppercase mb-3">Foundations of Wisdom</p>
            <h3 className="font-heading text-2xl md:text-3xl text-cream mb-4">
              Core Teachings and Values
            </h3>
            <div className="w-16 h-px bg-gold/30 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Ìwà Rere",
                subtitle: "Good Character",
                description: "Ìwà Rere means \"good character\" and is one of the most important principles in Yorùbá tradition. It refers to living with honesty, integrity, kindness, humility, respect, patience, and moral discipline. It teaches that true success and blessings come not only from knowledge or spiritual practice, but from cultivating good character and treating others with dignity and respect.",
              },
              {
                title: "Orí",
                subtitle: "Inner Consciousness & Spiritual Essence",
                description: "Each person carries a sacred inner consciousness that guides their journey through life. Through wisdom, self awareness, and right character, one aligns with their Orí to walk in purpose, fulfill destiny, and live in harmony with their highest potential.",
              },
              {
                title: "Àyànmọ́",
                subtitle: "Destiny",
                description: "In Yorùbá tradition, destiny is understood as the sacred path and purpose a person chooses before coming into the world. It represents the journey, lessons, experiences, and responsibilities connected to one's life. Through wisdom, right character, self awareness, and alignment with one's inner consciousness (Orí), a person moves closer toward fulfilling their destiny and living in harmony with their highest purpose and potential.",
              },
              {
                title: "Àṣẹ",
                subtitle: "Divine Power",
                description: "The life force and authority that flows through all creation, empowering words, actions, and intentions with spiritual efficacy.",
              },
              {
                title: "Ẹbọ Riru",
                subtitle: "Sacrifice and Offering",
                description: "A traditional spiritual practice of making prescribed offerings to promote balance, gratitude, harmony, and positive transformation in one's life and community.",
              },
            ].map((teaching, i) => (
              <div
                key={i}
                className="bg-card/50 border border-gold/10 rounded-lg p-6 hover:border-gold/30 transition-colors"
              >
                <h4 className="font-heading text-xl text-gold mb-1">{teaching.title}</h4>
                <p className="text-cream/80 text-sm mb-3 italic">{teaching.subtitle}</p>
                <p className="text-cream/60 text-sm leading-relaxed">{teaching.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Resources */}
        <div className="bg-card/30 border border-gold/10 rounded-lg p-8 lg:p-12">
          <div className="text-center mb-10">
            <p className="text-gold/60 text-sm tracking-[0.2em] uppercase mb-3">Learning and Growth</p>
            <h3 className="font-heading text-2xl md:text-3xl text-cream mb-4">
              Educational Resources
            </h3>
            <p className="text-cream/60 max-w-2xl mx-auto">
              We are committed to providing accessible education about Ifá and Isese traditions 
              through various media and community programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Documentary Series",
                description: "In-depth video documentaries exploring the history, practices, and living traditions of Ifá and Isese in the Caribbean diaspora.",
                status: "Coming Soon",
              },
              {
                title: "Educational Articles",
                description: "Written resources covering topics from basic concepts to deeper philosophical teachings, suitable for all levels of understanding.",
                status: "Coming Soon",
              },
              {
                title: "Community Workshops",
                description: "Interactive learning sessions led by elders and practitioners, offering hands-on cultural education and spiritual guidance.",
                status: "Coming Soon",
              },
            ].map((resource, i) => (
              <div
                key={i}
                className="bg-background/50 border border-gold/10 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg text-cream mb-2">{resource.title}</h4>
                <p className="text-cream/60 text-sm leading-relaxed mb-4">{resource.description}</p>
                <span className="inline-block text-gold/70 text-xs tracking-wider uppercase border border-gold/20 px-3 py-1 rounded-full">
                  {resource.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <div className="w-16 h-px bg-gold/30 mx-auto mb-8" />
          <p className="text-cream/60 italic leading-relaxed">
            &quot;We approach these sacred traditions with deep respect and humility, recognizing that true understanding 
            comes through patient study, guidance from elders, and sincere spiritual practice. Our mission is to 
            document and share these teachings authentically, honoring those who have preserved them across generations.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
