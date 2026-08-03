import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeORM lazy-loads the "pg" driver via a runtime require(); bundling it
  // breaks that lookup, so keep both as real node_modules requires instead.
  serverExternalPackages: ["typeorm", "pg"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
