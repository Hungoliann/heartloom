/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats; AVIF first (smallest), WebP fallback, then original.
    formats: ["image/avif", "image/webp"],
    // Allow-list of quality values usable via the `quality` prop (Next 15.4+ requirement).
    qualities: [75, 90],
    // Remote hosts we render through next/image.
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
