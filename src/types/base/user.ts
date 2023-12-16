import { Model, Types } from 'mongoose'

export type CartItem = {
  name: string
  image: string
  price: number
  countInStock: number
  quantity: number
}

export type Address = {
  street: string
  country: string
  city: string
  postalCode: string
}

export type PaymentMethod = 'Stripe' | 'PayPal'

export type User = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  cartItems: CartItem[]
  address?: Address
  paymentMethod?: PaymentMethod
}

export interface UserDocument extends User {
  cartItems: Types.DocumentArray<CartItem>
}

export type UserMethods = {
  matchPassword: (password: string) => Promise<boolean>
}

export type UserModel = Model<UserDocument, {}, UserMethods>
