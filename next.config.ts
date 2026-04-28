import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/hercules" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/hercules" : "",
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
