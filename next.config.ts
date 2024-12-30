import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-task-manager-9xyj.onrender.com/api/:path*",
      }
    ]
  }
};

export default nextConfig;
