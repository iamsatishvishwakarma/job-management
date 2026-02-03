export const _ERROR_MESSAGES = {
  NETWORK_ERROR: "Unable to connect to server. Please try again later.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  UNAUTHORIZED: "Session expired. Please login again.",
  FORBIDDEN: "You are not allowed to perform this action.",
  VALIDATION_ERROR: "Validation error occurred.",
  SERVER_ERROR: "Something went wrong on the server.",
  UNKNOWN_ERROR: "Something went wrong.",
  UNEXPECTED_ERROR: "Unexpected error occurred.",
} as const

export type ErrorMessagesType = (typeof _ERROR_MESSAGES)[keyof typeof _ERROR_MESSAGES]
