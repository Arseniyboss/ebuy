import { Model } from 'mongoose'

export type User = {
  _id: string
  name: string
  email: string
  password: string
}

export interface UserSchema extends User {
  matchPassword: (password: string) => Promise<boolean>
}

export type UserModel = Model<UserSchema>
