import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN access from mobile devices on local network without blocking dev resources
  allowedDevOrigins: [
    '192.168.29.106',
    'localhost',
    '127.0.0.1',
    '*.local',
  ],
  // Disable the development "N" badge indicator
  devIndicators: false,
};

export default nextConfig;
