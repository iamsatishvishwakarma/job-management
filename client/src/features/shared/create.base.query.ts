import { fetchBaseQuery } from "@reduxjs/toolkit/query"

import { type RootState } from "@/store"

import { env } from "@/configs/env.config"
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "@/constants/api.constant"

const createBaseQuery = (baseUrl: string = env.API_URL) =>
  fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth.token

      if (token) {
        headers.set(REQUEST_HEADER_AUTH_KEY, `${TOKEN_TYPE}${token}`)
      }

      return headers
    },
  })

export default createBaseQuery
