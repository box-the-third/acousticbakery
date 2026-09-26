import type { NextConfig } from "next";

// Set by the GitHub Pages workflow, e.g. "/acousticbakery". Empty for local dev
// and for custom domains.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // GitHub Pages is static hosting, so there is no image optimisation server.
    // Source images are already pre-sized WebP files.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "three"],
  },
};

export default nextConfig;
