import type { LoginRequestType, LoginResponseType } from "@/types/auth"

import { coreBaseApi } from "../api/core.base.api"

export const authApi = coreBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseType, LoginRequestType>({
      query: (body) => ({
        url: "/v1/auth/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        await queryFulfilled
        // dispatch(setCredentials(data))
        // dispatch(setCurrentUser(data))
      },
    }),
  }),
})

export const { useLoginMutation } = authApi
