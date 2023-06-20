export type User = {
  _id: string
  name: string
  email: string
  password: string
}

export interface UserSchema extends User {
  matchPassword: (password: string) => Promise<boolean>
}
