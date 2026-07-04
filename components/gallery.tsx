import Image from "next/image";
import { getPublishedContent } from "@/lib/content";
import { VideoEmbed } from "@/components/video-embed";

const galleryItems = [
  {
    src: "/images/cultural-event.jpg",
    alt: "Egbé Omo Oni Isese cultural performance with traditional drums",
    title: "Cultural Performance",
    featured: true,
  },
  {
    src: "/images/charity-work.jpg",
    alt: "Community charity and humanitarian work",
    title: "Charity Outreach",
  },
  {
    src: "/images/media-production.jpg",
    alt: "Documentary media production",
    title: "Media Production",
  },
  {
    src: "/images/community-event.jpg",
    alt: "Community gathering event",
    title: "Community Event",
  },
  {
    src: "/images/youth-education.jpg",
    alt: "Youth education program",
    title: "Youth Education",
  },
  {
    src: "/images/volunteer-work.jpg",
    alt: "Volunteer community service",
    title: "Volunteer Work",
  },
];

export async function Gallery() {
  const photos = await getPublishedContent("gallery");
  const videos = await getPublishedContent("video");
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

        {/* Gallery Grid - CMS photos */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded overflow-hidden bg-muted border border-gold/5 hover:border-gold/20 transition-colors group"
              >
                {photo.imageUrl && (
                  <Image
                    src={photo.imageUrl || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-cream/90 text-xs">{photo.title}</p>
                  {photo.description && (
                    <p className="text-cream/60 text-xs">{photo.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Featured Cultural Event Image */}
          <div className="col-span-2 row-span-2 relative rounded overflow-hidden group aspect-square md:aspect-auto">
            <Image
              src="/images/cultural-event.jpg"
              alt="Egbé Omo Oni Isese cultural performance with traditional drums"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-cream text-sm font-medium">Cultural Performance</p>
              <p className="text-cream/60 text-xs">Isese traditions celebration</p>
            </div>
          </div>

          {/* Other Gallery Images */}
          {galleryItems.slice(1).map((item, i) => (
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
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-cream/90 text-xs">{item.title}</p>
              </div>
            </div>
          ))}

          {/* Placeholder for future images */}
          <div className="relative aspect-square rounded overflow-hidden bg-muted border border-gold/10 hover:border-gold/20 transition-colors group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <svg className="w-14 h-14 text-gold/20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-cream/40 text-sm tracking-wider">Gallery To Be Added</p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Video Gallery Section */}
        <div className="mt-16">
          <h3 className="font-heading text-xl text-cream text-center mb-8 tracking-wide">
            Video Gallery
          </h3>
          {videos.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id}>
                  <div className="relative aspect-[16/10] rounded overflow-hidden bg-muted border border-gold/10">
                    <VideoEmbed url={video.videoUrl} title={video.title} poster={video.imageUrl} />
                  </div>
                  <p className="text-cream/80 text-base mt-3 text-center">{video.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {["Documentary Excerpt", "Community Event", "Interview Highlight"].map((title, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] rounded overflow-hidden bg-muted border border-gold/10 group"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/50 transition-colors">
                        <svg className="w-8 h-8 text-gold/50 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
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
          )}
        </div>
      </div>
    </section>
  );
}
