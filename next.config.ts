import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/home",
  assetPrefix: "/home",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;

