import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
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
