import type { UserResponseType } from "./user"

export interface LoginRequestType {
  emailAddress: string
  password: string
}

export interface LoginResponseType {
  token: string
  user: UserResponseType
}

export interface ForgetPasswordRequestType {
  username: string
}

export interface AuthStateType {
  token: string | null
  signedIn: boolean
}
