import type { EApplicationEnvironment } from "@/constants/app.constant"

interface EnvConfig {
  API_URL: string
  NODE_ENV: EApplicationEnvironment

  IS_DEVELOPMENT_MODE: boolean
  IS_PRODUCTION_MODE: boolean
}

export const env: EnvConfig = Object.freeze({
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV as EApplicationEnvironment,

  IS_DEVELOPMENT_MODE: process.env.NEXT_PUBLIC_NODE_ENV === "development",
  IS_PRODUCTION_MODE: process.env.NEXT_PUBLIC_NODE_ENV === "production",
})
