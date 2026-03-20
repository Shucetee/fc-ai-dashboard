import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/fc-ai-dashboard",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
