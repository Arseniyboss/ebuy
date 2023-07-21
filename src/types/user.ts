import { Model } from 'mongoose'
import { CartItem } from './product'

export type ShippingAddress = {
  address: string
  country: string
  city: string
  postalCode: string
}

type PaymentMethod = 'Stripe' | 'PayPal'

export type Checkout = {
  shippingAddress?: ShippingAddress
  paymentMethod?: PaymentMethod
}

export type User = {
  name: string
  email: string
  password: string
  cartItems: CartItem[]
  checkout?: Checkout
}

export interface UserSchema extends User {
  matchPassword: (password: string) => Promise<boolean>
}

export type UserModel = Model<UserSchema>
