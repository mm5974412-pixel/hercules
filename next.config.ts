import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/hercules" : "",
  assetPrefix: isProd ? "/hercules" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/hercules" : "",
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
