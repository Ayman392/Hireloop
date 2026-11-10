import type { NextConfig } from "next"
import { loadEnvConfig } from "@next/env"
import path from "node:path"

// The monorepo keeps local environment variables in the workspace root.
loadEnvConfig(
  path.resolve(process.cwd(), "../.."),
  process.env.NODE_ENV === "development",
  console,
  true,
)

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
}

export default nextConfig
