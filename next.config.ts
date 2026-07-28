import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  experimental: {
    useTypeScriptCli: true,
  },
  allowedDevOrigins: ["192.168.70.70"],
};

export default nextConfig;
