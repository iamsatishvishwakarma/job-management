import { createApi } from "@reduxjs/toolkit/query/react"

import createBaseQuery from "../shared/create.base.query"
import { withErrorHandling } from "../shared/with.error.handling"

export const coreBaseApi = createApi({
  reducerPath: "coreBaseApi",
  baseQuery: withErrorHandling(createBaseQuery()),
  endpoints: () => ({}),
})
