import type { NextConfig } from "next";

const ngrokUrl = process.env.NEXT_PUBLIC_NGROK_URL || "";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
    domains: [
      "localhost", 
      ...(ngrokUrl ? [new URL(ngrokUrl).hostname] : [])
    ],
  }
};

export default nextConfig;
