import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The main fix was moving large inline styles to CSS classes
  // This prevents webpack from serializing large strings in the cache
};

export default nextConfig;
