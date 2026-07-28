import Image from "next/image"
import { getPublishedByTypes } from "@/lib/public-content"
import { VideoPlayer } from "@/components/video-player"

const fallbackItems = [
  { src: "/images/cultural-event.jpg", alt: "Egbé Omo Oni Isese cultural performance with traditional drums", title: "Cultural Performance", subtitle: "Isese traditions celebration" },
  { src: "/images/charity-work.jpg", alt: "Community charity and humanitarian work", title: "Charity Outreach" },
  { src: "/images/media-production.jpg", alt: "Documentary media production", title: "Media Production" },
  { src: "/images/community-event.jpg", alt: "Community gathering event", title: "Community Event" },
  { src: "/images/youth-education.jpg", alt: "Youth education program", title: "Youth Education" },
  { src: "/images/volunteer-work.jpg", alt: "Volunteer community service", title: "Volunteer Work" },
]

type Photo = { src: string; alt: string; title?: string; subtitle?: string }

export async function Gallery() {
  const [galleryPosts, videos] = await Promise.all([
    getPublishedByTypes(["gallery", "event", "project"], 24),
    getPublishedByTypes(["video"], 6),
  ])

  // Flatten CMS gallery content into a list of photos (cover images + gallery arrays).
  const cmsPhotos: Photo[] = []
  for (const post of galleryPosts) {
    if (post.coverImage) {
      cmsPhotos.push({ src: post.coverImage, alt: post.excerpt || post.title, title: post.title, subtitle: post.location ?? undefined })
    }
    for (const g of post.gallery ?? []) {
      cmsPhotos.push({ src: g.url, alt: g.alt || post.title, title: post.title })
    }
  }

  const photos = cmsPhotos.length > 0 ? cmsPhotos.slice(0, 12) : fallbackItems
  const [feature, ...rest] = photos

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Visual Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Community Gallery
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Capturing moments of culture, community, and celebration
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Featured image */}
          {feature && (
            <div className="col-span-2 row-span-2 relative rounded overflow-hidden group aspect-square md:aspect-auto">
              <Image
                src={feature.src}
                alt={feature.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-cream text-sm font-medium">{feature.title}</p>
                {feature.subtitle && <p className="text-cream/60 text-xs">{feature.subtitle}</p>}
              </div>
            </div>
          )}

          {/* Other images */}
          {rest.map((item, i) => (
            <div
              key={i}
              className="relative aspect-square rounded overflow-hidden bg-muted border border-gold/5 hover:border-gold/20 transition-colors group"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-cream/90 text-xs">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Video Gallery Section */}
        <div className="mt-16">
          <h3 className="font-heading text-xl text-cream text-center mb-8 tracking-wide">
            Video Gallery
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.length > 0
              ? videos.map((video) => (
                  <div
                    key={video.id}
                    className="relative aspect-[16/10] rounded overflow-hidden bg-muted border border-gold/10"
                  >
                    {video.coverImage && (
                      <Image src={video.coverImage} alt={video.title} fill className="object-cover opacity-70" />
                    )}
                    {video.videoUrl && (
                      <VideoPlayer url={video.videoUrl} poster={video.coverImage} title={video.title} />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent pointer-events-none">
                      <p className="text-cream/90 text-sm">{video.title}</p>
                    </div>
                  </div>
                ))
              : ["Documentary Excerpt", "Community Event", "Interview Highlight"].map((title, i) => (
                  <div
                    key={i}
                    className="relative aspect-[16/10] rounded overflow-hidden bg-muted border border-gold/10 group"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/50 transition-colors">
                          <svg className="w-8 h-8 text-gold/50 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <p className="text-cream/40 text-sm tracking-wider">Video To Be Added</p>
                        <p className="text-cream/60 text-base mt-2">{title}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
