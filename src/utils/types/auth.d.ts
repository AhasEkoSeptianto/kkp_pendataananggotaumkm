export type AuthType = {
  User?: string
  Role?: any
  Email?: any
  ID?: number
  ProfilePicture?: string
  Token?: any
}

export type ProfileType = {
  Email?: string
  FullName?: string
  ID?: number
  PhoneNumber?: string
  ProfilePicture?: string
  Role?: {
    RoleName?: string
    RoleID?: string
  }
  Username?: string
  Accesses?: any
}