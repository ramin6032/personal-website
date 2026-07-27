import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
