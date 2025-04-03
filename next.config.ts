import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "localhost",
        process.env.NEXTAUTH_URL || "",
      ],
    },
  },
};

module.exports = nextConfig;

export default nextConfig;
