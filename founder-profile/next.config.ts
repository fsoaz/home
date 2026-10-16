import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  // Use the TypeScript 5 compiler API for consistent build checks.
  experimental: { useTypeScriptCli: false },
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
};
export default config;
