import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

import { showErrorToast } from "@/components/refs/toast.ref"
import { _ERROR_MESSAGES } from "@/constants/error.message.constant"
import { logout } from "@/features/auth/auth.slice"

export interface CustomError {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "CUSTOM_ERROR" | "TIMEOUT_ERROR"
  message: string
}

const _UNAUTHORIZED_STATUS_CODES = [401, 403]

export const withErrorHandling =
  (
    baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
  ): BaseQueryFn<string | FetchArgs, unknown, CustomError> =>
    async (args, api, extraOptions) => {
      try {
        const result = await baseQuery(args, api, extraOptions)

        // ✅ SUCCESS
        if (!result.error) {
          return { data: result.data }
        }

        const err = result.error as FetchBaseQueryError & {
          data?: { message?: string }
          error?: string
        }

        // 🌐 Network / server down
        if (err.status === "FETCH_ERROR") {
          const message = _ERROR_MESSAGES.NETWORK_ERROR

          showErrorToast(message)

          return {
            error: {
              status: "FETCH_ERROR",
              message,
            },
          }
        }

        const status =
          err.status === "TIMEOUT_ERROR" ? "TIMEOUT_ERROR" : (err.status ?? "CUSTOM_ERROR")

        // 🔐 Unauthorized → logout
        if (typeof status === "number" && _UNAUTHORIZED_STATUS_CODES.includes(status)) {
          api.dispatch(logout())
        }

        let message: string = _ERROR_MESSAGES.UNKNOWN_ERROR

        // Priority: backend message → mapped constant
        if (err.data?.message) {
          message = err.data.message
        } else if (status === "TIMEOUT_ERROR") {
          message = _ERROR_MESSAGES.TIMEOUT_ERROR
        } else if (status === 401) {
          message = _ERROR_MESSAGES.UNAUTHORIZED
        } else if (status === 403) {
          message = _ERROR_MESSAGES.FORBIDDEN
        } else if (typeof status === "number") {
          message = _ERROR_MESSAGES.SERVER_ERROR
        }

        // ❌ TOAST RULE
        // 400 / 422 → validation → NO TOAST
        const shouldShowToast = typeof status !== "number" || (status !== 400 && status !== 422)

        if (shouldShowToast) {
          showErrorToast(message)
        }

        return {
          error: {
            status,
            message,
          },
        }
      } catch {
        const message = _ERROR_MESSAGES.UNEXPECTED_ERROR

        showErrorToast(message)

        return {
          error: {
            status: "CUSTOM_ERROR",
            message,
          },
        }
      }
    }
