import { Types } from 'mongoose'

export type CartItem = {
  _id: Types.ObjectId
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
