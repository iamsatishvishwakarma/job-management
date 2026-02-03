export interface IUser {
  _id?: string
  fullName: string
  userCode: string
  emailAddress: string
  avatar?: string
  role: string
  isDeleted?: boolean
  isAccountVerified?: boolean
  isBlocked?: boolean
  isEmailVerified?: boolean
  gender: string
  mobileNumber: string
  address: string
  isPasswordSet?: boolean
  dateOfBirth: Date | null
}

export interface UserResponseType extends IUser {
  createdAt?: string | null
  updatedAt?: string | null
  __v?: number | null
}

export interface UserRequestType extends IUser {
  password: string
}

export interface CurrentUserType {
  currentUser: UserResponseType
  pageAuthority: string[]
}
