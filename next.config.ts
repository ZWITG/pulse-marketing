import type { NextConfig } from "next";

// PULSE_STATIC=1 builds the static export used by the Electron and Capacitor apps.
// Without it the app builds as a server so the API routes (route.server.ts) work.
const isStatic = process.env.PULSE_STATIC === "1";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" as const } : {}),
  pageExtensions: isStatic ? ["tsx", "ts", "jsx", "js"] : ["tsx", "ts", "jsx", "js", "server.ts"],
  ...(isStatic && process.env.PULSE_BASE_PATH ? { basePath: process.env.PULSE_BASE_PATH } : {}),
  devIndicators: false,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};
export default nextConfig;
