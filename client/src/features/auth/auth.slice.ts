import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { AuthStateType, LoginResponseType } from "../../types/auth"

const initialState: AuthStateType = {
  token: null,
  signedIn: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponseType>) => {
      state.token = action.payload.token
      state.signedIn = true
    },
    logout: (state) => {
      state.token = null
      state.signedIn = false
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
