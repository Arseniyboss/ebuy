export type UserCredentials = {
  email: string
  password: string
}

export interface User extends UserCredentials {
  id: string
  name: string
}

export interface UserSchema extends User {
  matchPassword: (password: string) => Promise<boolean>
}
