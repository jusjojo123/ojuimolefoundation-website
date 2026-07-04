import Image from "next/image";

function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    // YouTube
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) return url;
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
      }
    }
    // Vimeo
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    if (host === "player.vimeo.com") return url;
    return null;
  } catch {
    return null;
  }
}

export function VideoEmbed({
  url,
  title,
  poster,
}: {
  url: string | null;
  title: string;
  poster?: string | null;
}) {
  const embed = url ? toEmbedUrl(url) : null;

  if (embed) {
    return (
      <iframe
        src={embed}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  // Fallback: if we have a direct link but can't embed, link out over a poster/frame.
  return (
    <a
      href={url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 flex items-center justify-center group"
    >
      {poster && (
        <Image src={poster || "/placeholder.svg"} alt={title} fill className="object-cover opacity-60" />
      )}
      <div className="relative w-20 h-20 rounded-full border-2 border-gold/50 flex items-center justify-center group-hover:border-gold transition-colors">
        <svg className="w-8 h-8 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </a>
  );
}
