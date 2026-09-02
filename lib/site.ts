export const SITE_URL = "https://www.ojuimolefoundation.org"
export const SITE_NAME = "Ojú Imọ̀lẹ̀ Media Foundation"
export const DEFAULT_OG_IMAGE = "/images/hero-sacred-flames.jpg"

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}
