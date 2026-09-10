import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  agentRules: false,
  experimental: { globalNotFound: true },
};

export default nextConfig;
