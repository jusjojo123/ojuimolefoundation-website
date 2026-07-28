import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect the default *.vercel.app URL to the primary production domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<host>.*\\.vercel\\.app)",
          },
        ],
        destination: "https://www.ojuimolefoundation.org/:path*",
        permanent: true,
      },
      // Redirect the apex domain to the canonical www domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "ojuimolefoundation.org",
          },
        ],
        destination: "https://www.ojuimolefoundation.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
