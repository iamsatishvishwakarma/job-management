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

export const ROW_PER_PAGE_OPTIONS = [5, 10, 25] as const

export const _PAGINATION = {
  ROW_PER_PAGE_OPTIONS,
  ROW_PER_PAGE_DEFAULT: ROW_PER_PAGE_OPTIONS[0],
  ROW_PER_PAGE_MAX: ROW_PER_PAGE_OPTIONS[ROW_PER_PAGE_OPTIONS.length - 1],
  LIMIT: ROW_PER_PAGE_OPTIONS[0],
  PAGE: 0,
} as const
export type Pagination = (typeof _PAGINATION)[keyof typeof _PAGINATION]
