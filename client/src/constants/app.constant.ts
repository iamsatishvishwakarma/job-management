export const EApplicationEnvironment = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  STAGING: "staging",
} as const
export type EApplicationEnvironment =
  (typeof EApplicationEnvironment)[keyof typeof EApplicationEnvironment]

export const APP_NAME = "JOB MANAGMENT"
export const PERSIST_STORE_NAME = "admin"
export const REDIRECT_URL_KEY = "redirectUrl"