import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sasjlp706k.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
