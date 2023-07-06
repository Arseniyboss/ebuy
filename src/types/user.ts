import { Model } from 'mongoose'
import { CartItem } from './product'

export type User = {
  name: string
  email: string
  password: string
  cartItems: CartItem[]
}

export interface UserSchema extends User {
  matchPassword: (password: string) => Promise<boolean>
}

export type UserModel = Model<UserSchema>
