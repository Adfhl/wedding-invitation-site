import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare-only worker files are not part of the Vercel/Next runtime.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
