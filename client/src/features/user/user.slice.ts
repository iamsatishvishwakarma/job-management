import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { LoginResponseType } from "../../types/auth"
import type { CurrentUserType } from "../../types/user"

const initialState: CurrentUserType = {
  currentUser: {
    _id: "",
    fullName: "",
    userCode: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    emailAddress: "",
    role: "",
    gender: "",
    mobileNumber: "",
    address: "",
    dateOfBirth: null,
  },
  pageAuthority: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<LoginResponseType>) => {
      Object.assign(state.currentUser, action.payload.user)
    },
    clearCurrentUser: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { setCurrentUser, clearCurrentUser } = userSlice.actions
export default userSlice.reducer
